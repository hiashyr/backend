# Use the official PostgreSQL image from the Docker Hub
FROM postgres:13

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=
ENV POSTGRES_DB=pdd_project

# Copy the SQL dump file into the container
COPY dump.sql /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port
EXPOSE 5432
