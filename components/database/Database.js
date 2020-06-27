import React, { Component } from 'react';
import { View,Text,
StyleSheet,Button} from 'react-native';
import PouchDB from 'pouchdb-react-native'
import SQLite from 'react-native-sqlite-2'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'
import {address} from './constants'



export default class GetButton extends Component{
constructor(props)
{super(props)
   this.state={
        positions:[],
    }
}

getdata=()=>
{
  const SQLiteAdapter = SQLiteAdapterFactory(SQLite)
  PouchDB.plugin(SQLiteAdapter)

  
const rdbaddress={address}.address
const dbadress='mydb.db'

const rdb=new PouchDB(rdbaddress);
const db=new PouchDB(dbadress,{adpater:'react-native-sqlite'});


// rdb.put({
//     _id:'H1',
//     latitude:123,
//     longitude:123,

//   }).then(function (response) {
//     alert("worked")
//   }).catch(function (err) {
//     alert("error")
//     console.log(err);
//   });
let position_array=[]
let temp="";
rdb.allDocs({include_docs: true}, (err, docs)=> {
    if (err) {
       return console.log(err);
    } else {
       for(let i=0;i<docs.total_rows;i++)
       {
         position_array.push({position:docs.rows[i].doc._id,latitude:docs.rows[i].doc.latitude,longitude:docs.rows[i].doc.longitude})
         db.put({
          _id:docs.rows[i].doc._id,
          latitude:docs.rows[i].doc.latitude,
          longitude:docs.rows[i].doc.longitude
      
        }).then(function (response) {

        }).catch(function (err) {
          console.log(err);
        });
        }
// alert( position_array.length)
       this.setState({
       positions:position_array,

      })


      
    }
 });
}

seedata=()=>{

  let display=''
  for(let i=0;i<this.state.positions.length;i++)
  {
    display=display+this.state.positions[i].position+" "+
    this.state.positions[i].latitude+" "+this.state.positions[i].longitude+
"\n"

  }
alert(display)
}
render()
    {
       return(
<View>
<View style={styles.container} >

<Button title="Fetch data" onPress={()=>this.getdata()} style={styles.getbutton} >
 

</Button>


</View>

<View style={styles.container}>

<Button title="View data" onPress={()=>this.seedata()} style={styles.getbutton} >
 

</Button>


</View>
</View>
        
       )
    }
}



const styles=StyleSheet.create(
    {



        container:{
          alignItems:'center',
          justifyContent:'center',
          marginVertical:100,

       



        },
        getbutton:{
          flex:1,

          borderWidth:1,
           height:50,
           width:200,
          backgroundColor:'cyan',
          alignItems:'center',
          justifyContent:'center',
        
          

       
         

        },
        
        
   
        txt:{
fontSize:25,

       
         

        }





    }
)