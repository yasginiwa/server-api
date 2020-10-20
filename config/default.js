module.exports = {
    db_config: {
        host: '127.0.0.1',
        user: 'root',
        password: 'yasginiwa',
        database: 'dbbin',
        port: 3306
    },
    jwt_config: {
        secretOrKey: 'yasginiwa12#$',
        expiresIn: 3600
    },
    baseURL: {
        private: '/api/v1/private',
        public: '/api/v1/public'
    },
    upload_config: {
        
    }
}