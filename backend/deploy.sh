GOOGLE_PROJECT_ID=steady-orb-415321
CLOUD_RUN_SERVICE=api-snupie
INSTANCE_CONNECTION_NAME=steady-orb-415321:us-central1:snupie
DB_USER=root
DB_PASSWORD=1234
DB_NAME=snupie_bd

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
  --project $GOOGLE_PROJECT_ID

gcloud run deploy $CLOUD_RUN_SERVICE \
    --image gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_USER=$DB_USER,DB_PASSWORD=$DB_PASSWORD,DB_NAME=$DB_NAME \
    --project $GOOGLE_PROJECT_ID
    ```