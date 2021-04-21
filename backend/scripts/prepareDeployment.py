import json
import argparse
import uuid

parser = argparse.ArgumentParser()
parser.add_argument('--dbuser', required=True)
parser.add_argument('--dbpassword', required=True)
parser.add_argument('--dbdatabase', required=True)
parser.add_argument('--outputFolder', required=True)
parser.add_argument('--port')
parser.add_argument('--logLevel')
args = parser.parse_args()


ormTemplate = None
with open('ormconfigTemplate.json', 'r') as template:
    ormTemplate = json.load(template)

ormTemplate['username'] = args.dbuser
ormTemplate['password'] = args.dbpassword
ormTemplate['database'] = args.dbdatabase

with open(f'{args.outputFolder}/ormconfig.json', 'w') as ormconfig:
    json.dump(ormTemplate, ormconfig)


appTemplate = None
with open('configTemplate.json', 'r') as template:
    appTemplate = json.load(template)

appTemplate['secret'] = uuid.uuid4().hex
appTemplate['backendPort'] = args.port if args.port else 3002
appTemplate['loggingLevel'] = args.logLevel if args.logLevel else 'info'

with open(f'{args.outputFolder}/config.json', 'w') as appConfig:
    json.dump(appTemplate, appConfig)
