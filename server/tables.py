"""Creation of tables in the database for the fitmate application."""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import Base  # Make sure you import Base from models
from database import DATABASE_URL

# Create the engine for the PostgreSQL database
engine = create_engine(DATABASE_URL)

# Create all the tables in the database
Base.metadata.create_all(bind=engine)
