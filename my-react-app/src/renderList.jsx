
function RenderList(){
    const fruits = [{id:1,Name :'Apple', Price: 1.2},
    {id:2,Name :'Banana', Price: 0.5},
    {id:3,Name :'Cherry', Price: 2.0},
    {id:4,Name :'Date', Price: 3.0}];

    const items = fruits.map(fruit => <li key={fruit.id}> {fruit.Name} - ${fruit.Price.toFixed(2)} </li>);
    

    return (
        <ol>
        {items}
        </ol>
    );
}

export default RenderList;
// This component renders a list of items using the map function.