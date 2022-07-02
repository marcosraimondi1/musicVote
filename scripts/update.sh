# C O N F I G U R A C I O N E S __ D E __ P R O Y E C T O (clonar repo, build front, env variables, run docker-compose)
cd ..

sudo docker-compose down

sudo git pull


# install dependencies and build project

cd frontend

sudo npm install --no-audit --no-fund --no-optional

sudo npm run build

cd ..

sudo rm ./backend/dist -r

sudo mv ./frontend/dist ./backend # move build to backend

echo -------------------------- starting docker -------------------------------------

sudo docker-compose build

sudo docker-compose up -d