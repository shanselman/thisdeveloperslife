{
    up:{
        create_table:{
            name:"Steve",
            columns[
                {name:"ID", type: "int", primary_key},
                {name: "Title", type:"string", length: "500" }
            ]
        }
    }
    down:{
        drop_table:"steve"
    }
    
}