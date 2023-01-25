//dogRepository uses external API and is wrapped in an IIFE

let dogRepository = (function (){
    let dogList = [];
    let apiUrl = 'https://api.thedogapi.com/v1/breeds';
    let dogListElement = $('.dog-list');

    // adds dog to dogList via .push with conditions
    function add(dog){
        if (typeof dog === "object" && "name" in dog){
            dogList.push(dog);
            console.log('add() called, "' + dog.name + '" added');
        }
        else {
            console.log('dog is not correct');
        }
    }

    //getAll function returns all items in dogList array
    function getAll(){
        console.log('getAll() called');
        return dogList;
    }

    //function to load dog API list
    function loadList(){
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json){
            json.forEach(function(item){
                let dog = {
                    weight: item.weight.imperial,
                    height: item.height.imperial,
                    name: item.name,
                    bredFor: item.bred_for,
                    breedGroup: item.breed_group,
                    lifeSpan: item.life_span,
                    temperament: item.temperament,
                    origin: item.origin,
                    imageUrl: item.image.url
                };
                console.log('loadList() called');
                add(dog);
            });
        }).catch(function(e){
            console.error(e);
        })
    }

    // add dogs to dogList in <button> format
    function addListItem(dog){
        let listItem = $('<li class="group-list-item"></li>');
        let itemButton = $('<button type="button" class="dog-button btn btn-info" data-target="#dog-modal" data-toggle="modal">' + dog.name + '</button>');

        //listItem.append(itemButton);
        listItem.append(itemButton);
        dogListElement.append(listItem);

        console.log('addlListItem() called' + dog.name);
        console.log("dog object", JSON.stringify(dog));

        //event listener shows dog details when button is clicked
        itemButton.on('click', function(){
            console.log('itemButton has been clicked',  JSON.stringify(dog));
            showDetailsModal(dog);
        });
    }

    // Modal function using Bootstrap
    function showDetailsModal(dog){
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');

        modalBody.empty();
        modalTitle.text(dog.name);

        let image = $('<img id="dog-img" src="' + dog.imageUrl + '"/>');
        let breedGroup = $('<p id="breed-group" class="col-12 text-center">Breed Group: ' + dog.breedGroup + '</p>');
        let weight = $('<p id="weight" class="col-12 text-center">Weight: ' + dog.weight + ' lbs</p>');
        let height = $('<p id="height" class="col-12 text-center">Height: ' + dog.height + ' inches</p>');
        let lifeSpan = $('<p id="life-span" class="col-12 text-center">Life Span: ' + dog.lifeSpan + '</p>');
        let temperment = $('<p id="temperament" class="col-12 text-center">Temperment: ' + dog.temperament + '</p>');
        let origin = $('<p id="origin" class="col-12 text-center">Origin: ' + dog.origin + '</p>');
        let bredFor = $('<p id="bred-for" class="col-12 text-center">Bred For: ' + dog.bredFor + '</p>');

        modalBody.append(image);
        modalBody.append(breedGroup);
        modalBody.append(weight);
        modalBody.append(height);
        modalBody.append(lifeSpan);
        modalBody.append(temperment);
        modalBody.append(origin);
        modalBody.append(bredFor);

        if(dog.breedGroup === undefined || dog.breedGroup.length < 1){
            $('#breed-group').remove();
        }
        if(dog.lifeSpan === undefined || dog.lifeSpan.length < 1){
            $('#life-span').remove();
        }
        if(dog.temperament === undefined || dog.temperament.length < 1){
            $('#temperament').remove();
        }
        if (dog.origin === undefined || dog.origin.length < 1) {
            $('#origin').remove();
        }
        if(dog.bredFor === undefined || dog.bredFor.length < 1){
            $('#bred-for').remove();
        }

        console.log('showDetailsModal() called');
    }   

    // functionality for filtering dog-list via search input
    $(document).ready(function(){
        $('#search-value').on('keyup', function(){
          var value = $(this).val().toLowerCase();
          $('#dog-list li').filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

      console.log('function X is cslled');

      // filter data from defined functions
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
    };
})();

// Implements dog objects from API into apps DOM
dogRepository.loadList().then(function(){
    dogRepository.getAll().forEach(function(dog){
        dogRepository.addListItem(dog);
        console.log('implement dog objects from API into DOM ' + dog.name);
    });
});
