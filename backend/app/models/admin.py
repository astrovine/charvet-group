from sqlalchemy.orm import relationship
from ..utilities import database
from sqlalchemy import Integer, String, Column, Boolean, TIMESTAMP, text, Float, ForeignKey


class User(database.Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    is_superadmin = Column(Boolean, nullable=False, server_default='False')
    is_active = Column(Boolean, nullable=False, server_default='True')
    last_login = Column(TIMESTAMP(timezone=True), nullable=True)
    role = Column(String, nullable=False, server_default='admin')
    sales = relationship("SalesData", back_populates="owner")



class SalesData(database.Base):
    __tablename__ = "sales_data"
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    date = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    location = Column(String, nullable=False)
    customer_name = Column(String, nullable=False)
    phone_no = Column(String, nullable=True)
    imperial_crown = Column(Float, nullable=True, default=0)
    cranberry = Column(Float, nullable=True, default=0)
    orange = Column(Float, nullable=True, default=0)
    mango = Column(Float, nullable=True, default=0)
    black_stallion = Column(Float, nullable=True, default=0)
    sales_rep = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("admins.id", ondelete="CASCADE"))
    owner = relationship("User", back_populates="sales")
