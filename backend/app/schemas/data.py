from datetime import datetime

from pydantic import BaseModel,field_validator


class Sales(BaseModel):
    location: str
    date: datetime

    @field_validator('date', mode='before')
    def parse_date(cls, value):
        if isinstance(value, str):
            return datetime.strptime(value, "%d/%m/%y")
        return value

class salesrep(Sales):
    name: str
    product: str | None = None

class product(Sales):
    black_stallion: bool | None = False
    orange: bool | None = False
    cranberry: bool | None = False
    mango: bool | None = False
    imperial_crown: bool | None = False
    quantity: int

class customer(Sales):
    cust_name: str
    cust_phone: str | None = None


class SalesData(BaseModel):
    date: datetime | None = None
    location: str | None = None
    customer_name: str | None = None
    phone_no: str | None = None
    imperial_crown: float | None = None
    cranberry: float | None = None
    orange: float | None = None
    mango: float | None = None
    black_stallion: float | None = None
    sales_rep: str | None = None

class SalesCreate(SalesData):
    pass

class SalesUpdate(SalesData):
    pass

class SaleRecord(BaseModel):
    id: int
    date: datetime
    location: str
    customer_name: str
    phone_no: str | None = None
    imperial_crown: float | None = 0
    cranberry: float | None = 0
    orange: float | None = 0
    mango: float | None = 0
    black_stallion: float | None = 0
    sales_rep: str
    user_id: int | None = None

    class Config:
        from_attributes = True

class DashboardFilters(BaseModel):
    start_date: str | None = None
    end_date: str | None = None
    location: str | None = None
    sales_rep: str | None = None
    product: str | None = None
    customer_name: str | None = None
