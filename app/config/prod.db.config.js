module.exports = {
    HOST: 'http://ec2-3-17-139-170.us-east-2.compute.amazonaws.com/phtmyadmin',
    USER: 'root',
    PASSWORD: 'Un!versity2022',
    DB: 'survey',
    dialect: 'mysql', 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

