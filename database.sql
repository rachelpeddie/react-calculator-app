--- INITIAL TABLE CREATION

CREATE TABLE "calculations"(
	"id" SERIAL PRIMARY KEY,
	"equation" VARCHAR,
	"solution" VARCHAR
);

--- INITIAL DATA

INSERT INTO "calculations" ("equation", "solution")
VALUES ('21x4', '84');