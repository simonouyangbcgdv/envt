# envt

☁️ Environment variables management from S3

## Requirements
- S3 Bucket
- `env` folder at the root
- Add files inside `env` folder: `env.production`, `env.staging`

## Installation
```
npm install -g envt
```

## Usage
```
Usage

  $ envt <command> <environment>

  $ envt edit <environment>                     Launch web app to edit environment variables
  $ envt list <environment>                     Print environment variables

Options

  --s3Bucket                                    AWS S3 Bucket where the .env files are stored. It's required.

  --port                                        Port where the web app is runs

  --credentials [awscli, env]                   Where to load AWS credentials from - awscli configuration
                                                or from the environment. If from the environment,
                                                AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY and AWS_DEFAULT_REGION
                                                have to be set

Examples

  $ envt edit production --s3Bucket secrets     Downloads env.production file from S3 bucket 'secrets' and
                                                opens web app to edit the variables

  $ envt list development --s3Bucket secrets    List env.development variables from S3 bucket 'secrets'
```

## How to export the environment variables?
```
export $(envt list ENVIRONMENT --s3Bucket BUCKET_NAME)
```

## License
MIT © [Joaquim Adraz](http://joaquimadraz.com)
