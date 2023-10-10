


$(document).ready(function () {

    var jobListings = [];


    function displayListings(listings) {
        const listingsContainer = $('.job-listings');
        listingsContainer.empty();
    
        listings.forEach(function (job) 
        {
            const isNewLabel = job.new ? '<span class="label new">New!</span>' : '';
            const isFeaturedLabel = job.featured ? '<span class="label featured">Featured</span>' : '';
            const listingHTML = `
                <div class="job-listing">
                    <div class="job-logo"><img src="${job.logo}" alt="${job.company} Logo"></div>
                    
                    <div class="job-details">
                    <div class="labels">
                        ${isNewLabel}
                        ${isFeaturedLabel}
                    </div>
                        <h3>${job.company}</h3>
                        <h2>${job.position}</h2>
                        <p>${job.postedAt} • ${job.contract} • ${job.location}</p>
                    </div>
                    <div class="job-tags">
                        <span class="tag">${job.role}</span>
                        <span class="tag">${job.level}</span>
                        ${job.languages.map(lang => `<span class="tag">${lang}</span>`).join('')}
                        ${job.tools.map(tool => `<span class="tag">${tool}</span>`).join('')}
                    </div>
                    <button class="label-delete">X</button>
                </div>
    
            `;
    
            
            listingsContainer.append(listingHTML);
    
           
        });
    
    
     }

     

    function addJobListing(newJob) {
        jobListings.push(newJob);  
        displayListings(jobListings);  
    }


    $.getJSON('data.json', function (data) {
     jobListings = data;

        displayListings(jobListings);
        
    $('.add-job-button').click(function () {
        $('.new-popup').fadeIn(300); 
    });

    $('#jobForm').submit(function (event) 
    {
        event.preventDefault();

         $('#jobForm').off('submit');

        const newJob = {
            id: jobListings.length + 1,
            company: $('#company').val(),
            logo: './images/eyecam-co.svg',
            new: true,
            featured: true,
            position: $('#position').val(),
            role: $('#role').val(),
            level: $('#level').val(),
            postedAt: "Now",
            contract: $('#contract').val(),
            location: $('#location').val(),
            languages: [], // Initialize languages array
            tools: [] // Initialize tools array
        };


         $('input[name="languages"]:checked').each(function () {
            newJob.languages.push($(this).val());
        });

         $('input[name="tools"]:checked').each(function () {
            newJob.tools.push($(this).val());
        });
 
        addJobListing(newJob);  
        $('.new-popup').fadeOut(300);  
        $('#jobForm')[0].reset();
    });

    $('.close-popup').click(function () {
        $('.new-popup').fadeOut(300);  
    });

    
    $('.job-listings').on('click', '.job-details h2', function () {
        const jobListing = $(this).closest('.job-listing');
        
        const company = jobListing.find('h3').text();
        const position = jobListing.find('h2').text();
        const role = jobListing.find('.tag:nth-child(1)').text();
        const level = jobListing.find('.tag:nth-child(2)').text();
        const contract = jobListing.find('.tag:nth-child(3)').text();
        const location = jobListing.find('p').text().split('•')[2].trim(); // Assuming location is the third element split by '•'
        const languages = jobListing.find('.tag:gt(2)').map(function () {
            return $(this).text();
        }).get();
        const tools = jobListing.find('.tag:gt(2)').map(function () {
            return $(this).text();
        }).get();
    
        $('#popup-company').text(company);
        $('#popup-position').text(position);
        $('#popup-role').text(role);
        $('#popup-level').text(level);
        $('#popup-contract').text(contract);
        $('#popup-location').text(location);
    
       
    
        // Show the job details popup
        $('.job-popup-j').fadeIn(300);
    });
    
    // Close the popup when clicking the close button
    $('.job-popup').on('click', '.close-popup', function () {
        $('.job-popup').fadeOut(300);
    });
    
    


        $('.job-listings').on('click', '.label-delete', function () {
            const jobListing = $(this).closest('.job-listing');
            jobListing.fadeOut(300, function () {
                $(this).remove(); 
            });
        });
    });
});



