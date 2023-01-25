//dogRepository uses external API and is wrapped in an IIFE

let dogRepository = (function (){
    let apiUrl = 'https://dogs-by-api-ninjas.p.rapidapi.com/v1/dogs?offset=200';
    let dogList = [];
    let dogListElement = $('.dog-list');
    let options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dqs6TnwAXNLp/IPS36iCHQ==UVnOpzioLWQKv4Re',
            'X-RapidAPI-Host': 'dogs-by-api-ninjas.p.rapidapi.com'
        }
    };

    // adds dog to dogList array via .push with conditions
    function add(dog){
        if (typeof dog === "object" && "name" in dog){
            dogList.push(dog);
            console.log(dog.name + ' added to dogList array');
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

    //function to load dog API list and add objects to dogList array
    function loadList(){
        return fetch(apiUrl, options).then(function(response){
            return response.json();
        }).then(function(json){
            json.forEach(function(item){
                let dog = {
                    image_link: item.image,
                    good_with_children: item.goodWithChildren,
                    good_with_other_dogs: item.goodWithOtherDogs,
                    shedding: item.shedding,
                    grooming: item.grooming,
                    drooling: item.drooling,
                    coat_length: item.coatLength,
                    good_with_strangers: item.goodWithStrangers,
                    playfulness: item.playfulness,
                    protectiveness: item.protectiveness,
                    trainability: item.trainability,                    
                    energy: item.energy,
                    barking: item.barking,
                    min_life_expectency: item.minLifeExpectency,
                    max_life_expectency: item.maxLifeExpectency,
                    max_height_male: item.maxHeightMale,
                    max_height_female: item.maxHeightFemale,
                    max_weight_male: item.maxWeightMale,
                    max_weight_female: item.maxWeightFemale,
                    min_height_male: item.minHeightMale,
                    min_height_female: item.minHeightFemale,
                    min_weight_male: item.minWeightMale,
                    min_weight_female: item.minWeightFemale,
                    name: item.name,
                    
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
        let listItem = $('<li class="group-list-item">xyz<li>');
        let itemButton = $('<button type="button" class="dog-button btn btn-info" data-target="#dog-modal" data-toggle="modal">abc' + dog.name + '<button>');

        listItem.append(itemButton)
        dogListElement.append(listItem);
        console.log('addlListItem() called ' + dog.name);

        //event listener shows dog details when button is clicked
        itemButton.on('click', function(){
            console.log('itemButton has been clicked');
            showDetails(dog);
        });
    }

    //function to show details, called when dog button is clicked and opens detailsModal
    function showDetails(dog){
        loadList(dog).then(function(){
            console.log('showDetails() is called' + dog.name);
            showDetailsModal(dog);
            
        });
    }

    // Modal function using Bootstrap
    function showDetailsModal(dog){
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');

        modalBody.empty();
        modalTitle.text(dog.name);

        let image = $('<img id="dog-img" src="' + dog.image + '"/>');
        let weightFemale = $('<p id="weight-f" class="col-12 text-center">Female Weight: ' + dog.minWeightFemale + ' lbs - ' + dog.maxWeightFemale + ' lbs</p>');
        let heightFemale = $('<p id="height-f" class="col-12 text-center">Female Height: ' + dog.minHeightFemale + ' inches - ' + dog.maxHeightFemale + ' inches</p>');
        let weightMale = $('<p id="weight-m" class="col-12 text-center">Female Weight: ' + dog.minWeightFemale + ' lbs - ' + dog.maxWeightFemale + ' lbs</p>');
        let heightMale = $('<p id="height-m" class="col-12 text-center">Female Height: ' + dog.minHeightFemale + 'inches - ' + dog.maxHeightFemale + ' inches</p>');
        let lifeExpectancy = $('<p id="life-expectancy" class="col-12 text-center">Life Span: ' + dog.minLifeExpectancy + 'years - ' + dog.maxLifeExpectancy + ' years</p>');
        let shedding = $('<p id="shedding" class="col-12 text-center">Shedding: ' + dog.shedding + '</p>');
        let grooming = $('<p id="grooming" class="col-12 text-center">Grooming: ' + dog.grooming + '</p>');
        let drooling = $('<p id="drooling" class="col-12 text-center">Drooling: ' + dog.drooling + '</p>');
        let playfulness = $('<p id="playfullness" class="col-12 text-center">Playfulness: ' + dog.playfulness + '</p>');
        let protectiveness = $('<p id="protectiveness" class="col-12 text-center">Protectiveness: ' + dog.protectiveness + '</p>');
        let trainability = $('<p id="trainability" class="col-12 text-center">Trainability: ' + dog.trainability + '</p>');
        let energy = $('<p id="energy" class="col-12 text-center">Energy: ' + dog.energy + '</p>');
        let barking = $('<p id="barking" class="col-12 text-center">Barking: ' + dog.barking + '</p>');
        let goodWithChildren = $('<p id="good-with-children" class="col-12 text-center">Good With Children: ' + dog.goodWithChildren + '</p>');
        let goodWithStrangers = $('<p id="good-with-strangers" class="col-12 text-center">Good With Strangers: ' + dog.goodWithStrangers + '</p>');
        let goodWithOtherDogs = $('<p id="good-with-other-dogs" class="col-12 text-center">Good With Other Dogs: ' + dog.goodWithOtherDogs + '</p>');
        
        
        modalBody.append(image);
        modalBody.append(weightFemale);
        modalBody.append(heightFemale);
        modalBody.append(weightMale);
        modalBody.append(heightMale);
        modalBody.append(lifeExpectancy);
        modalBody.append(shedding);
        modalBody.append(grooming);
        modalBody.append(drooling);
        modalBody.append(playfulness);
        modalBody.append(protectiveness);
        modalBody.append(trainability);
        modalBody.append(energy);
        modalBody.append(barking);
        modalBody.append(goodWithChildren);
        modalBody.append(goodWithStrangers);
        modalBody.append(goodWithOtherDogs);

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
        showDetails: showDetails
    };
})();

// Implements dog objects from API into apps DOM
dogRepository.loadList().then(function(){
    dogRepository.getAll().forEach(function(dog){
        dogRepository.addListItem(dog);
    });
    console.log('implemented dog objects from API into DOM ');
});
