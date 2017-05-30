const userData = require('./userData.json')

module.exports= {

  getUsers: function (req, res, next){

    if(req.query != {}){
      const key = Object.keys(req.query)[0]
      const value = req.query[key]
      var result = [];
      switch (key) {
        case "favorites":
          for(let i = 0; i< userData.length; i++){
            for (let j = 0; j < userData[i].favorites.length;j++){
              if (userData[i].favorites[j] == value){
                result.push(userData[i]);
              }
            }
          }
          break;
        case "age":
          for(let i = 0; i< userData.length; i++){
              if (userData[i].age < value){
                result.push(userData[i]);
              }
          }
          break;
        case "lastname":
          for(let i = 0; i< userData.length; i++){
              if (userData[i].last_name == value){
                result.push(userData[i]);
              }
          }
          break;
        case "email":
          for(let i = 0; i< userData.length; i++){
              if (userData[i].email == value){
                result.push(userData[i]);
              }
          }
          break;
      }

      if (!value){
        return res.status(200).send(userData);
      }
      if (key == "email"){
        return res.status(200).json(result[0]);
      }
      return res.status(200).json(result);

    }

  },

  getUserById: function(req, res, next){
    const id = req.params.id;

    for(let i = 0; i < userData.length; i++){
      if(userData[i].id == id){
        return res.status(200).json(userData[i])
      }
    }
    return res.status(404).json(null);

  },

  getAdmins: function(req, res, next){
    let results = [];
    for (let i = 0; i < userData.length;i++){
      if(userData[i].type == "admin"){
        results.push(userData[i]);
      }
    }
    res.status(200).json(results)
  },

  getNonAdmins: function(req, res, next){
    let results = [];
    for (let i = 0; i < userData.length;i++){
      if(userData[i].type != "admin"){
        results.push(userData[i]);
      }
    }
    res.status(200).json(results)
  },

  getByUserType: function(req, res, next){
    const type = req.params.type
    let results = [];
    for (let i = 0; i < userData.length;i++){
      if(userData[i].type == type){
        results.push(userData[i]);
      }
    }
    res.status(200).json(results)
  },

  updateUser: function(req, res, next){
    const id = req.params.id;
    const user_update= req.body;

    for(let i = 0; i < userData.length; i++){
      if (userData[i].id == id){
        Object.assign(userData[i], user_update);
      }
    }

    res.status(200).json(userData)

  },

  addUser: function(req, res, next){
    let user_info = req.body;
    user_info.id = userData.length+1

    userData.push(user_info)

    res.status(200).json(userData)
  },

  destroyUser: function(req, res, next){
    const id = req.params.id;

    for(let i = 0; i < userData.length; i++){
      if(userData[i].id == id){
        userData.splice(i--,1)
        return res.status(200).json(userData);
      }
    }
  }



}
