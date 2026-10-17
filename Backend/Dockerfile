FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["DecorativeMagnetsWebApi/DecorativeMagnetsWebApi.csproj", "DecorativeMagnetsWebApi/"]
COPY ["RepositoryLayer/RepositoryLayer.csproj", "RepositoryLayer/"]
COPY ["ServiceLayer/ServiceLayer.csproj", "ServiceLayer/"]

RUN dotnet restore ./DecorativeMagnetsWebApi/DecorativeMagnetsWebApi.csproj

COPY . .

RUN dotnet publish ./DecorativeMagnetsWebApi/DecorativeMagnetsWebApi.csproj \ 
    -c Release \ 
    -o /app/publish \ 
    --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 5001
ENTRYPOINT ["dotnet", "DecorativeMagnetsWebApi.dll"]