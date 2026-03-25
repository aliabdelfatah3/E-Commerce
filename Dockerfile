# Use the .NET 8 SDK to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy only the backend project file first to cache dependencies
COPY Backend/*.csproj ./Backend/
RUN dotnet restore Backend/*.csproj

# Copy the rest of the backend source code
COPY Backend/ ./Backend/

# Build and publish the backend
WORKDIR /app/Backend
RUN dotnet publish -c Release -o out

# Build the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/Backend/out .

# Expose the application on port 8080
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["dotnet", "ECommerce.API.dll"]
