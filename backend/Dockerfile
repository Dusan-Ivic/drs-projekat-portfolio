# Base image
FROM python:3.9-alpine

# Set environment variables for database connection
ENV MONGO_URI "mongodb+srv://portfolio123:portfolio123@cluster0.kqej46w.mongodb.net/?retryWrites=true&w=majority"
ENV DB_NAME "Portfolio"

# Set docker's working directory
WORKDIR /app/backend

# Install pipenv
RUN pip install pipenv

# Copy all files from current working directory to docker's working directory
COPY . .

# Install packages from Pipfile
RUN pipenv install --dev --system --deploy

# Set port for server
EXPOSE 5000

# Run application
CMD ["python", "app.py"]