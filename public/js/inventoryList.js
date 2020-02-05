var db = firebase.firestore();

var equipmentDatabaseRef = db.collection('Inventory');

/*equipmentDatabaseRef.onSnapshot({
    // Listen for document metadata changes
    includeMetadataChanges: true
    }, function(doc) {

    //Updating Inventory in Inventory List Page

    var numberOfEquipments = doc.data().dataOfEquipment.length;
    
    var avai = 0;

    $("#tbod").html("");

    for(var i=0; i<numberOfEquipments;i++){

        var eqData = doc.data().dataOfEquipment[i];

        $("#inventoryTable").append("<tr><th scope='row'>"+(i+1) +"</th><td class='equipmentName'>"+eqData.equipmentName +"</td><td class='qrNumber'>"+eqData.qrNumber+"</td><td class='modelNumber'>"+eqData.modelNumber+"</td><td class='dateOfInstallation'>"+eqData.dateOfInstallation+"</td><td class='status'>"+eqData.status+"</td></tr>");

        if(eqData.status == "active"){
            avai++;
        } 

    }

    

    $("#tot").text(numberOfEquipments);
    $("#avai").text(avai);
    $("#unavai").text((numberOfEquipments - avai));

});*/

equipmentDatabaseRef.onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
        
        },function(querySnapshot) {
        var documents = [];
        var documentName = [];
        querySnapshot.forEach(function(doc) {
            documents.push(doc.data());
            documentName.push(doc.id);
        });
        console.log(documentName);

        for(var i=1;i<documents.length;i++){

            var eqData = documents[i];

            console.log(eqData["Last scan"]);


            $("#inventoryTable").append("<tr><th scope='row'>"+(i) +"</th><td class='equipmentName'>"+documentName[i] +"</td><td class='qrNumber'>"+eqData['Type'][0]+"</td><td class='modelNumber'>"+eqData['S/N']+"</td><td class='dateOfInstallation'>"+eqData['Mfg'].toDate().toDateString()+"</td><td class='status'>"+eqData['Service due']+"</td></tr>");

        }

        /* var equipmentDoc = documents[0].dataOfEquipment;

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

        } */
});







