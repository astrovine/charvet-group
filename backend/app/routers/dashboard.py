from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from sqlalchemy import and_
from sqlalchemy.orm import Session
import pandas as pd
from io import BytesIO
from ..schemas import data
from ..utilities.database import get_db
from ..models import admin
from ..utilities import oauth2
router = APIRouter(
    prefix="/sales",
    tags=["Dashboard"]
)

PRODUCTS = ['imperial_crown', 'cranberry', 'orange', 'mango', 'black_stallion']

def get_sales_data_df(db: Session, filters: data.DashboardFilters = None):
    """Fetch sales data from database and return as a pandas DataFrame."""
    try:
        query = db.query(admin.SalesData)
        if filters:
            filter_conditions = []
            if filters.start_date:
                filter_conditions.append(admin.SalesData.date >= filters.start_date)
            if filters.end_date:
                filter_conditions.append(admin.SalesData.date <= filters.end_date)
            if filters.location:
                filter_conditions.append(admin.SalesData.location == filters.location)
            if filters.sales_rep:
                filter_conditions.append(admin.SalesData.sales_rep == filters.sales_rep)
            if filters.customer_name:
                filter_conditions.append(admin.SalesData.customer_name == filters.customer_name)
            if filter_conditions:
                query = query.filter(and_(*filter_conditions))
        df = pd.read_sql(query.statement, query.session.bind)
        if not df.empty:
            df['date'] = pd.to_datetime(df['date'])
        return df

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.get("/overview")
async def get_dashboard_overview(filters: data.DashboardFilters = Depends(), db: Session = Depends(get_db)):
    """Get overall dashboard statistics"""
    df = get_sales_data_df(db, filters)
    if df.empty:
        return {"error": "No data available"}

    df['total_sales'] = df[PRODUCTS].sum(axis=1)
    df_sales = df[df['total_sales'] > 0].copy()

    overview = {
        "total_records": len(df),
        "total_sales_records": len(df_sales),
        "total_units_sold": float(df_sales['total_sales'].sum()),
        "avg_units_per_transaction": float(df_sales['total_sales'].mean()),
        "date_range": {
            "start": df['date'].min().strftime('%Y-%m-%d') if not df.empty else None,
            "end": df['date'].max().strftime('%Y-%m-%d') if not df.empty else None
        },
        "unique_customers": int(df['customer_name'].nunique()),
        "unique_locations": int(df['location'].nunique()),
        "unique_sales_reps": int(df['sales_rep'].nunique()),
        "product_totals": {
            product: float(df_sales[product].sum()) for product in PRODUCTS
        }
    }

    return overview


@router.get("/daily")
async def get_daily_sales(filters: data.DashboardFilters = Depends(), db: Session = Depends(get_db), current_user: admin.User = Depends(
    oauth2.get_current_user)):
    """Get daily sales trends"""
    df = get_sales_data_df(db, filters)
    if df.empty:
        return {
            "daily_sales": [],
            "total_days": 0
        }

    df['total_sales'] = df[PRODUCTS].sum(axis=1)
    df_sales = df[df['total_sales'] > 0].copy()

    daily_sales = df_sales.groupby(df_sales['date'].dt.date)[PRODUCTS + ['total_sales']].sum().reset_index()
    daily_sales['date'] = pd.to_datetime(daily_sales['date']).dt.strftime('%Y-%m-%d')

    return {
        "daily_sales": daily_sales.to_dict('records'),
        "total_days": len(daily_sales)
    }


@router.get("/performances")
async def get_rep_performance(filters: data.DashboardFilters = Depends(), db: Session = Depends(get_db), current_user: admin.User = Depends(
    oauth2.get_current_user)):
    """Get sales rep performance metrics"""
    df = get_sales_data_df(db, filters)
    if df.empty:
        return {"rep_performance": []}

    df['total_sales'] = df[PRODUCTS].sum(axis=1)
    df_sales = df[df['total_sales'] > 0].copy()

    rep_performance = df_sales.groupby('sales_rep').agg(
        total_units=('total_sales', 'sum'),
        avg_units_per_sale=('total_sales', 'mean'),
        total_transactions=('total_sales', 'count'),
        unique_customers=('customer_name', 'nunique')
    ).round(2).reset_index()

    rep_performance = rep_performance.sort_values('total_units', ascending=False)

    return {
        "rep_performance": rep_performance.to_dict('records')
    }


@router.get("/locations")
async def get_location_performance(filters: data.DashboardFilters = Depends(), db: Session = Depends(get_db), current_user: admin.User = Depends(
    oauth2.get_current_user), limit: int | None = 10):
    """Get location performance metrics"""
    df = get_sales_data_df(db, filters)
    if df.empty:
        return {"location_performance": []}

    df['total_sales'] = df[PRODUCTS].sum(axis=1)
    df_sales = df[df['total_sales'] > 0].copy()

    location_performance = df_sales.groupby('location').agg(
        total_units=('total_sales', 'sum'),
        avg_units_per_sale=('total_sales', 'mean'),
        total_transactions=('total_sales', 'count'),
        unique_customers=('customer_name', 'nunique'),
        unique_reps=('sales_rep', 'nunique')
    ).round(2).reset_index()

    location_performance = location_performance.sort_values('total_units', ascending=False)
    if limit:
        location_performance = location_performance.head(limit)

    return {
        "location_performance": location_performance.to_dict('records')
    }


@router.get('/customer/{name}')
def get_customer(name: str, db: Session = Depends(get_db), current_user: admin.User = Depends(oauth2.get_current_user)):
    """Get customer performance metrics"""
    customer_filters =  data.DashboardFilters(customer_name=name)
    df = get_sales_data_df(db, customer_filters)
    if df.empty:
        return {"error": f"No data found for customer '{name}'"}
    customer_df = df[df['customer_name'] == name].copy()
    if customer_df.empty:
        return {"error": f"No data found for customer '{name}'"}
    customer_df['total_sales'] = customer_df[PRODUCTS].sum(axis=1)
    df_sales = customer_df[customer_df['total_sales'] >= 0].copy()
    customer_summary = {
        "customer_name": name,
        "total_units_purchased": int(df_sales['total_sales'].sum()),
        "avg_units_per_transaction": float(df_sales['total_sales'].mean()),
        "total_transactions": int(len(df_sales)),
        "first_purchase_date": df_sales['date'].min().strftime('%Y-%m-%d') if not df_sales.empty else None,
        "last_purchase_date": df_sales['date'].max().strftime('%Y-%m-%d') if not df_sales.empty else None,
        "unique_locations": int(df_sales['location'].nunique()),
        "unique_sales_reps": int(df_sales['sales_rep'].nunique()),
        "product_totals": {
            product: float(df_sales[product].sum()) for product in PRODUCTS
        }
    }

    return {"Customer": customer_summary}


@router.get('/location/{location_name}')
def get_single_location_performance(location_name: str, db: Session = Depends(get_db), limit: int | None = 10, current_user: admin.User = Depends(
    oauth2.get_current_user)):
    """Get performance metrics for a single location"""
    location_filter = data.DashboardFilters(location=location_name)
    df = get_sales_data_df(db, location_filter)
    if df.empty:
        return {"error": f"No data found for location '{location_name}'"}
    location_data = df[df['location'] == location_name].copy()
    location_data['total_sales'] = location_data[PRODUCTS].sum(axis=1)
    limited_data = location_data.head(limit)
    return limited_data.to_dict('records')


@router.get('/', response_model=list[data.SaleRecord])
def get_all_sales(db: Session = Depends(get_db), current_user: admin.User = Depends(oauth2.get_current_user), skip: int = 0, limit: int = 1000):
    """Get all sales records"""
    sales = db.query(admin.SalesData).order_by(admin.SalesData.date.desc()).offset(skip).limit(limit).all()
    return sales


@router.post('/', response_model=data.SaleRecord, status_code=status.HTTP_201_CREATED)
def create_new_entry(db: Session = Depends(get_db), entry: data.SalesCreate = None, current_user: admin.User = Depends(
    oauth2.get_current_superadmin)):
    """Create a new sales transaction entry"""
    try:
        new_entry = admin.SalesData(**entry.model_dump())
        db.add(new_entry)
        db.commit()
        db.refresh(new_entry)
        return new_entry
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create entry: {str(e)}")


@router.put('/{entry_id}', response_model=data.SaleRecord)
def update_entry(entry_id: int, db: Session = Depends(get_db), entry: data.SalesUpdate = None, current_user: admin.User = Depends(
    oauth2.get_current_superadmin)):
    """Update an existing sales transaction entry"""
    entry_query = db.query(admin.SalesData).filter(admin.SalesData.id == entry_id)
    existing_entry = entry_query.first()
    if not existing_entry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Entry with id {entry_id} not found")
    try:
        update_data = entry.model_dump(exclude_unset=True)
        entry_query.update(update_data, synchronize_session=False)
        db.commit()
        return entry_query.first()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to update entry: {str(e)}")


@router.delete('/{entry_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_entry(entry_id: int, db: Session = Depends(get_db), current_user: admin.User = Depends(
    oauth2.get_current_superadmin)):
    """Delete a sales transaction entry"""
    entry_query = db.query(admin.SalesData).filter(admin.SalesData.id == entry_id)
    existing_entry = entry_query.first()
    if not existing_entry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Entry with id {entry_id} not found")
    try:
        entry_query.delete(synchronize_session=False)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to delete entry: {str(e)}")


@router.post('/upload', status_code=status.HTTP_201_CREATED)
async def upload_sales_data(db: Session = Depends(get_db), file: UploadFile = File(...), current_user: admin.User = Depends(
    oauth2.get_current_superadmin)):
    """Upload sales data from an Excel file (.xlsx, .xls)."""
    try:
        # Read the uploaded file's contents into a BytesIO object
        contents = await file.read()
        df = pd.read_excel(BytesIO(contents))
        df.columns = [col.strip().lower().replace(' ','_') for col in df.columns]
        print(f"Columns found in file: {df.columns.tolist()}")

        required_columns = {'date', 'location', 'sales_rep', 'customer_name', 'phone_no'}.union(set(PRODUCTS))
        if not required_columns.issubset(df.columns):
            missing_cols = required_columns - set(df.columns)
            raise HTTPException(status_code=400, detail=f"Missing required columns: {', '.join(missing_cols)}")

        df['date'] = pd.to_datetime(df['date'], errors='coerce')
        if df['date'].isnull().any():
            raise HTTPException(status_code=400, detail="Invalid date format in 'date' column")

        records = df.to_dict(orient='records')
        for record in records:
            # Check if a similar record already exists
            existing_entry = db.query(admin.SalesData).filter_by(
                date=record['date'],
                customer_name=record['customer_name'],
                location=record['location']
            ).first()

            if existing_entry:
                for key, value in record.items():
                    setattr(existing_entry, key, value)
            else:
                new_entry = admin.SalesData(**record)
                db.add(new_entry)

        db.commit()
        return {"message": f"Successfully processed {len(records)} records."}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to upload data: {str(e)}")
