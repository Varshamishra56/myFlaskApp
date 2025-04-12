# Use the official Python image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy everything to container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8080

# Set environment variable for Flask
ENV PORT 8080

# Run the application
CMD ["python", "app.py"]
