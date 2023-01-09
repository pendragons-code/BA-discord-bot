# sample data for divisions and stuff:
```
totalDivisionCount = number of divisions in total


let squadDetails = await db.get("15th_Infantry")
{
	size: "4",
	members: ["Beethoven", "Clown"],
	battalion: "3",
	division: "1"
}


let BattalionDetails = await db.get("7th_Battalion")
{
	size: "10",
	members: ["Pen Pen", "CookieMan"],
	division: "1",
	squads: [ "43rd infantry", "11th Raiders" ]
}



let divisionTotal = await db.get("divisionTotal")
4




let divisionDetails = await db.get("1_divisionDetails")
{
	size: "20",
	members: ["Pen Pen", "Banana"], //names go here
	battalionCount: "2",
	squadCount: "5",
}
```

This sample data at a first glance covers the entire system in terms of data sampling, we should be able to expand this vertically and horizontally very easily
