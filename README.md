# Paperspace NodeJS REST Coding Challenge

Write a NodeJS service using the express framework (or a derivative) that implements a set of RESTful style interfaces to:

- [x] create address records containing a name, street, city, state, and country
- [x] returning a unique key for each address record
- [x] check that the state is valid for the country using an external REST service http://www.groupkt.com/post/f2129b88/free-restful-web-services-to-consume-and-test.htm
- [x] note the URL for the API has changed to the domain www.groupkt.com instead of services.groupkt.com groupkt.com/post/f2129b88/free-restful-web-services-to-consume-and-test.htm
- [x] update and delete individual address records
- [x] list all the stored address records for a given state and country
- [] dockerize
- [] tests

## Design Philosophy

I am a big fan of React so I think opening with a Dan Abramov quote is appropriate.

> Okay, I give in. I wrote a guide on the most scalable file structure for React projects. I’m using it every day. Best part: it works for Vue projects too. Hope it’s helpful! https://t.co/O2mNVx7vCs
> — Dan Abramov (@dan_abramov) August 8, 2018

## Assumptions and Notes

- Input for state and country will be codes IE USA. Perhaps if it is user input is assisted with a google API etc.
- I did not use es6 import and export. I know I should have because it was specifically asked for and I ALWAYS use it for my ReactJS or LitElement but it feels odd to use it in a Node server. Anyway bad habit ill be looking to break.
