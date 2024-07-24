import app from './src/app';
import { sequelize } from './src/models';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const isDevelopment = process.env.NODE_ENV === 'development';

sequelize.sync({ force: isDevelopment }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

