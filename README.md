Reactive Streams Operators (RxJS)
AIM:

Explain all Reactive Stream Operators with proper code references and examples.
Demonstrate the working of key operators such as map, filter, flatMap, reduce, merge, zip, and concat using a simple reactive program.

THEORY:

Reactive stream operators are small functions that modify or control data flowing through a stream.
Instead of processing all data at once, they handle it asynchronously — as soon as data arrives.
Operators can transform, filter, merge, or summarize values in real time.

KEY OPERATORS USED:
Operator	Purpose	Example
map()	Transforms each value	1,2,3 → 10,20,30
filter()	Filters data based on a condition	Keep only even numbers
mergeMap()	Flattens inner observables concurrently	A,B → A1,A2,B1,B2 (unordered)
concatMap()	Flattens inner observables sequentially	A,B → A1,A2,B1,B2
merge()	Merges multiple observables	Mixes data streams together
concat()	Runs observables one after another	[1,2,3] + [4,5] = [1,2,3,4,5]
zip()	Pairs values by index	(X,Y,Z) + (1,2) = (X,1), (Y,2)
reduce()	Aggregates all values into one result	Sum of 1..5 = 15
PROGRAM EXECUTION:

Each operator runs interactively from the terminal using process arguments:

node reactiveoperators.js <operator_name>


Example:

node reactiveoperators.js map

SAMPLE OUTPUTS:
map -> 10
map -> 20
map -> 30

filter -> 2
filter -> 4
filter -> 6

reduce -> 15

CONCLUSION:

Reactive Operators help transform and control data streams efficiently.
They are essential in reactive programming to make applications asynchronous, flexible, and responsive.