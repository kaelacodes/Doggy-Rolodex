//dogRepository uses external API and is wrapped in an IIFE

let dogRepository = (function(){
    let dogList = [];
    let apiUrl = 'https://api.thedogapi.com/v1/breeds'

    // adds dog to dogList via .push with conditions
    function add(dog){
        if (typeof dog === "object" && "name" in dog){
            dogList.push(dog);
        }
        else {
            console.log("dog is not correct");
        }
    }

    //getAll function returns all items in dogList array
    function getAll(){
        return dogList;
    }

    // add dogs to dogList in <button> format
    function addListItem(dog){
        let dogList = $('.dog-list');
        let listItem = $('<li class="group-list-item"><li>');
        let itemButton = $('<button type="button" class="dog-button btn btn-info" data-target="#dog-modal" data-toggle="modal">${dog.name}<button>');

        listItem.append(itemButton);
        dogList.append(listItem);

        //event listener shows dog details when button is clicked
        itemButton.on('click', function(){
            showDetails(dog);
        });
    }

    
    
    //function to load dog API list
    function loadList(){
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json){
            json.results.forEach(function(item){
                let dog = {
                    weight: item.weight.imperial,
                    height: item.height.imperial,
                    name: item.name,
                    bredFor: item.bred_for,
                    breedGroup: item.breed_group,
                    lifeSpan: item.life_span,
                    temperment: item.temperment,
                    origin: item.origin,
                    imageUrl: item.image.url
                };
                add(dog);
            });
        }).catch(function(e){
            console.error(e);
        })
    }
    

    // function to use the detailsUrl to load details data about dog breeds
    function loadDetails(item){
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(details){
            //item details
            item.imageUrl = details.image.url;
            item.breedGroup = details.breed_group;
            item.weight = details.weight.imperial;
            item.height = details.height.imperial;
            item.lifeSpan = details.life_span;
            item.temperment = details.temperment;
            item.origin = details.origin;
            item.bredFor = details.bred_for;
        }).catch(function(e){
            console.error(e);
        });
    }

    //function to show details
    function showDetails(dog){
        loadDetails(dog).then(function(){
            showDetailsModal(dog);
        });
    }

    // Modal function using Bootstrap
    function showDetalsModal(dog){
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');

        modalBody.empty();
        modalTitle.text(dog.name.charAt(0).toUpperCase() + dog.name.slice(1));

        let image = $('<div class="dog-img" src="' + dog.imageUrl + '"/>');
        let breedGroup = $('<p class="col-12 text-center">' + 'Breed Group: ' + dog.breedGroup + '</p>');
        let weight = $('<p class="col-12 text-center">' + 'Weight: ' + dog.weight + '</p>');
        let height = $('<p class="col-12 text-center">' + 'Height: ' + dog.height + '</p>');
        let lifeSpan = $('<p class="col-12 text-center">' + 'Life Span: ' + dog.lifeSpan + '</p>');
        let temperment = $('<p class="col-12 text-center">' + 'Temperment' + dog.temperment + '</p>');
        let origin = $('<p class="col-12 text-center">' + 'Origin: ' + dog.origin + '</p>');
        let bredFor = $('<p class="col-12 text-center">' + 'Bred For: ' + dog.bredFor + '</p>');

        modalBody.append(image);
        modalBody.append(breedGroup);
        modalBody.append(weight);
        modalBody.append(height);
        modalBody.append(lifeSpan);
        modalBody.append(temperment);
        modalBody.append(origin);
        modalBody.append(bredFor);
    }

    // filter data from defined functions
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

dogRepository.loadList().then(function(){
    dog.Repository.getAll().forEach(function(dog){
        dogRepository.addListItem(dog);
    });
});

/*
// UPDATED: forEach() loop - DOM manipulation
dogRepository.getAll().forEach((function(dog){
    dogRepository.addListItem(dog);
}))
*/