FROM python:3.11-slim

# Installer les outils nécessaires
RUN apt-get update && apt-get install -y \
    gcc \
    libc-dev \
    python3-dev \
    libffi-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Créer le répertoire de l'application
RUN mkdir /app

WORKDIR /app

# Copier les dépendances
COPY requirements.txt requirements.txt

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copier les fichiers de l'application
COPY recommendation_objects/ recommendation_objects/
COPY agents/ agents/
COPY agent_controller.py agent_controller.py
COPY main.py main.py

# Définir le point d'entrée
ENTRYPOINT ["python", "main.py"]


