
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "golf_venues" (
	"id" SERIAL PRIMARY KEY,
	"venue_name" VARCHAR (1000),
	"type" VARCHAR (100),
	"yardage" INTEGER,
	"user_id" INT REFERENCES "user"
	
);

CREATE TABLE "golf_history" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"golf_venue_id" INT REFERENCES "golf_venues" ,
	"date" TIMESTAMP DEFAULT NOW(), 
	"note" VARCHAR (1000) 
);




INSERT INTO "golf_venues" ("venue_name", "type", "yardage", "user_id")
VALUES ('X-Golf', 'simulator', '300','1');

INSERT INTO "golf_history" ("user_id", "golf_venue_id", "note")
VALUES ('1','1','great venue');

SELECT * FROM "golf_venues" 
JOIN "golf_history" ON "golf_venues"."id" = "golf_history"."golf_venue_id"
WHERE "golf_history"."user_id"= 1; --change 1 to $1


SELECT "golf_venues"."venue_name", "golf_venues"."id" AS "venues_id", "golf_venues"."type", "golf_venues"."yardage", "golf_venues"."user_id", "golf_history"."id" AS "history_id", "golf_history"."date", "golf_history"."note"
        FROM "golf_venues"
        JOIN "golf_history" ON "golf_venues"."id" = "golf_history"."golf_venue_id"
        WHERE "golf_history"."user_id"= $1;`;