# ab-tech-radar

The Aftonbladet Tech Radar Management System

## PROD

Build for Heroku deployment

### Setup database
`heroku run 'db-migrate up'`

## DEV

### Setup database

1. Install vagrant
2. `vagrant up`
3. `npm install`
4. `db-migrate up --config config/development.json -e DATABASE_URL` (Run this literally, dont replace 'DATABASE_URL')

