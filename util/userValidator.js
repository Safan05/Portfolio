const Ajv=require("ajv");
ajv=new Ajv();
const schema={
    type:"object",
    properties:{
         fnm:{
            type:"string",
            pattern:"^[A-Z][a-z]*$"
        },
        lnm:{
            type:"string",
            pattern:"^[A-Z][a-z]*$"
        },
        email:{
            type:"string",
            pattern: "^\\S+@\\S+\\.\\S+$"
        },
        pass:{
            type:"string",
            minLength:5
        },
},
    required:["fnm","lnm","email","pass"]
}
module.exports=ajv.compile(schema);