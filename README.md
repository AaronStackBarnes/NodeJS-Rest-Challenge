# NodeJS REST Coding Challenge

Write a NodeJS service using the express framework (or a derivative) that implements a set of RESTful style interfaces to:

- [x] create address records containing a name, street, city, state, and country
- [x] returning a unique key for each address record
- [x] check that the state is valid for the country using an external REST service http://www.groupkt.com/post/f2129b88/free-restful-web-services-to-consume-and-test.htm
- [x] note the URL for the API has changed to the domain www.groupkt.com instead of services.groupkt.com groupkt.com/post/f2129b88/free-restful-web-services-to-consume-and-test.htm
- [x] update and delete individual address records
- [x] list all the stored address records for a given state and country
- [x] dockerize
- [x] tests
- [x] write cURLs 

## Installation 
1. clone this repo 
2. [install docker-compose](https://docs.docker.com/compose/install/)
3. `docker-compose up`

## Tests 
to run tests after installing docker compose run `docker-compose  -f docker-compose.test.yml  up`

## cURLs

POST
`
curl -X POST \
  http://localhost:8080/addresses \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 114' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:8080' \
  -H 'User-Agent: PostmanRuntime/7.19.0' \
  -H 'cache-control: no-cache' \
  -d '{
	"street": "9 washington ave",
	"zip": "1234-5667",
	"country": "USA",
	"state": "NY",
	"city": "NYC"
}'
`

GET
`
curl -X GET \
  http://localhost:8080/addresses \
  -H 'cache-control: no-cache'
`
PUT
`
curl -X PUT \
  http://localhost:8080/addresses/<ID> \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"street": "9"
}'
`

DELETE
`
curl -X DELETE \
  http://localhost:8080/addresses/5dc07a3b39724243de7f7fb2 \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache'
`

POST
> this will fail because of state country mismatch
> it would also fail as a PUT
`
curl -X POST \
  http://localhost:8080/addresses \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 114' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:8080' \
  -H 'cache-control: no-cache' \
  -d '{
	"street": "9 washington ave",
	"zip": "1234-5667",
	"country": "IND",
	"state": "NY",
	"city": "NYC"
}'
`

## Design Philosophy

I am a big fan of React so I think opening with a Dan Abramov quote is appropriate.

> Okay, I give in. I wrote a guide on the most scalable file structure for React projects. I’m using it every day. Best part: it works for Vue projects too. Hope it’s helpful! https://t.co/O2mNVx7vCs
> — Dan Abramov (@dan_abramov) August 8, 2018

Jokes aside check out the the git log for a detailed walk through of my approach and thought process.

## Assumptions and Notes

- I have never dockerized a Mongo database. I have always just used a dedicated droplet I would not put this into production as I have no clue if I did it correctly, but hey it works.
- Input for state and country will be codes IE USA. Perhaps if it is user input is assisted with a google API etc.
- I did not use es6 import and export. I know I should have because it was specifically asked for and I ALWAYS use it for my ReactJS or LitElement but it feels odd to use it in a Node server. Anyway bad habit ill be looking to break.
- My test are insufficient. Like in real life I was pressed for time and they suffered.
