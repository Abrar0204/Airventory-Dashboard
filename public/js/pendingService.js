var db = firebase.firestore();

var DatabaseRef = db.collection('airVentory');

// console.log(databaseRef);

db.collection("airVentory")
    .onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
        
        },function(querySnapshot) {
        var documents = [];
        querySnapshot.forEach(function(doc) {
            documents.push(doc.data());
        });
        //console.log(documents[0].dataOfEquipment.length);

        var equipmentDoc = documents[0].dataOfEquipment;

        var technicianDoc = documents[1].dataOfTechnicians; 

        $(".scrollClass").html("");

        for(var i=0; i<equipmentDoc.length;i++){

            var eqDoc = equipmentDoc[i];

            if(eqDoc.status == "Shelved"){
               
            for(var j=0;j<technicianDoc.length;j++){

                var techDoc = technicianDoc[j];

                // alert(techDoc.assignedEquipmentModelNumber);

                if(eqDoc.modelNumber == techDoc.assignedEquipmentModelNumber){

                    $(".scrollClass").append("<div class='card mb-3 mt-3' style='width: 100%;'><h5 class='card-header pendEquipmentName'>"+eqDoc.equipmentName +"</h5><div class='card-body'><h5 class='card-title pendModelNumber'>Model Number: "+ eqDoc.modelNumber+"</h5><h5 class='card-title pendTechnician'>Assingned Technician: "+ techDoc.technicianName+"</h5><h5 class='card-title pendPhoneNumber'>Phone Number: "+techDoc.phoneNumber+"</h5></div></div>");

                }
            }

            }

        }


    });

