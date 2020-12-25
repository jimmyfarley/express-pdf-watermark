rm app.zip
zip -9 -r --exclude=*.git* --exclude=*.ts* --exclude=*.DS_Store* --exclude=*node_modules* app.zip ./*
