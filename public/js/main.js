$(function() {
    var table = $('.table');
    var modaltable = $('#modaltable');
    var start = 0;

    $('#btnload').on('click', load); /*load All data*/
    $('#btnSearch').on('click', fetch); /*fetch perticular country*/
    $('#addCountry').on('click', AddCountry); /*Add details of new Country*/
    $('#addPlayers').on('click', AddPlayers);
    $('#updateCountry').on('click', UpdateCountry);
    $('#updatePlayers').on('click', UpdatePlayers);
    $('#Countrydetail').on('click', activateCountry);
    $('#editPlayer').on('click', activatePlayer);
    $('.table').on('click', '.link', callTable);
    $('.table').on('click', '.edit', EditCountryData);
    $('.table').on('click', '.deleteCountry', deleteData);

    $('#add').on('hidden.bs.modal', function() {
        $(this).find('form').trigger('reset');
    });

    $('#addPlayer').on('hidden.bs.modal', function() {
        $(this).find('form').trigger('reset');
    });

    window.onscroll = Wscroll;

    /*fatching data for a perticular country*/
    function fetch() {
        console.log("hi");
        var query = $('#search').val(),
            query = query.substr(0, 1).toUpperCase() + query.substr(1);
        console.log(query);
        $.ajax({
                type: 'get',
                url: 'http://localhost:8080/Country?CountryName=' + query,
                success: function(data) {
                		// console.log("inside success");
                    if (query=='') {
                    	// console.log('inside success if');
                        alert("Please enter the Country Name");
                    } else {
                        table.html("<tr><th>CountryName</th><th>ID</th><th>Rank</th><th>Total</th><th></th><th></th></tr>");
                        $.each(data, function(i, item) {
                            table.append('<tr><td><a href="#detail" data-toggle="modal" class="link">' + item.CountryName + '</a></td>' +
                                '<td class="selectId">' + item.id + '</td>' +
                                '<td>' + item.Rank + '</td>' +
                                '<td>' + item.Total + '</td>' +
                                '<td><a href="#add" roll="button" class="btn btn-primary edit" data-toggle="modal"><span class="glyphicon glyphicon-pencil"></span></a></td>' +
                                '<td><button class="btn-dim deleteCountry"><span class="glyphicon glyphicon-trash"></span></button></td></tr>');
                        });
                    }

                },



           
            error: function() {
                console.log("data not found");
            }

        });
}

/*this function will load all countries and its data*/
function load() {
    $.ajax({
        type: 'get',
        url: "http://localhost:8080/country?_start=" + start + "&_limit=10",
        success: function(data) {
            table.html("<tr><th>CountryName</th><th>ID</th><th>Rank</th><th>Total</th><th></th><th></th></tr>");
            $.each(data, function(i, item) {
                table.append('<tr><td><a href="#detail" data-toggle="modal" class="link">' + item.CountryName + '</a></td>' +
                    '<td class="selectId">' + item.id + '</td>' +
                    '<td>' + item.Rank + '</td>' +
                    '<td>' + item.Total + '</td>' +
                    '<td><a href="#add" roll="button" class="btn btn-primary edit" data-toggle="modal" ><span class="glyphicon glyphicon-pencil"></span></a></td>' +
                    '<td><button class="btn-dim deleteCountry"><span class="glyphicon glyphicon-trash"></span></button></td></tr>');
            });

        },

    });
}

function Wscroll() {
    console.log(scroll);
    start = start + 10;
    var wrap = document.getElementById('tblwrap');
    var contentHeight = wrap.offsetHeight;
    console.log("contentHeight" + contentHeight);
    var yOffset = window.pageYOffset;
    console.log("yOffset" + yOffset);
    var y = yOffset + window.innerHeight;
    console.log("y" + y);
    if (y >= contentHeight) {
        console.log("content height reached");
        $.ajax({
            type: 'get',
            url: "http://localhost:8080/country?_start=" + start + "&_limit=10",
            success: function(data) {
                $.each(data, function(i, item) {
                    table.append('<tr><td><a href="#detail" data-toggle="modal" class="link">' + item.CountryName + '</a></td>' +
                        '<td class="selectId">' + item.id + '</td>' +
                        '<td>' + item.Rank + '</td>' +
                        '<td>' + item.Total + '</td>' +
                        '<td><a href="#add" roll="button" class="btn btn-primary edit" data-toggle="modal" ><span class="glyphicon glyphicon-pencil"></span></a></td>' +
                        '<td><button class="btn-dim deleteCountry"><span class="glyphicon glyphicon-trash"></span></button></td></tr>');
                });
                // page=page+1;
            },
        });

    }
}

function callTable() {
    var link = $(this);
    query = link.text();
    console.log(query);
    modaltable.empty();
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/Players?CountryName=' + query,
        success: function(data) {
            console.log('modal success');
            modaltable.html("<tr><th>Name</th><th>ID</th><th>Sports</th><th>Event</th><th>Picture</th><th></th><th></th></tr>");
            $.each(data, function(i, item) {
                modaltable.append('<tr><td class="selectedName">' + item.Name + '</td>' +
                    '<td class="selectId">' + item.id + '</td>' +
                    '<td>' + item.Medal + '</td>' +
                    '<td>' + item.Event + '</td>' +
                    '<td><img src="' + item.Picture + '"</td>' +
                    '<td><a href="#addPlayer" roll="button" class="btn btn-primary editPlayer" data-toggle="modal" data-dismiss="modal"><span class="glyphicon glyphicon-pencil"></span></button></td>' +
                    '<td><button class="btn-dim deleteRow"><span class="glyphicon glyphicon-trash"></span></button></td></tr>');
            });
            $('.deleteRow').on('click', deletePlayer);
            $('.editPlayer').on('click', EditPlayerData);
        },
    });

}

function EditCountryData() {
    console.log('inside country');
    var query = $(this).closest('tr').children().filter(".selectId").text();
    console.log(query);
    var countryN = $('#Cname');
    var cid = $('#Cid');
    var crank = $('#Crank');
    var medals = $('#Tmedals');
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/Country?id=' + query,
        success: function(data) {
            console.log('success edit country');
            $.each(data, function(i, item) {
                // console.log(item);
                countryN.val(item.CountryName);
                countryN.attr('disabled', 'true');
                cid.val(item.id);
                cid.attr('disabled', 'true');
                crank.val(item.Rank);
                medals.val(item.Total);
            });

        },
    });
}

function EditPlayerData() {
    var query = $(this).closest('tr').children().filter(".selectedName").text();
    // console.log(query);
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/Players?Name=' + query,
        success: function(data) {
            $.each(data, function(i, item) {
                // console.log(item);
                $('#Pid').val(item.id);
                $('#Pid').attr('disabled', true);
                $('#PCname').val(item.CountryName);
                $('#PCname').attr('disabled', true);
                $('#Pname').val(item.Name);
                $('#Pmedal').val(item.Medal);
                $('#PEye').val(item.EyeColor);
                $('#Psport').val(item.Sports);
                $('#Pevent').val(item.Event);
                $('#Pdate').val(item.Date);
                $('#Pimage').val(item.Picture);
                $('#Page').val(item.Age);
                $('#Pgender').val(item.Gender);
                $('#Pno').val(item.phone);
                $('#Pabout').val(item.About);
            });

        },
    });
}

function deleteData() {
    console.log('inside delete country');
    var click = $(this).closest('tr').children().filter(".selectId").text();
    console.log(click);
    $(this).closest('tr').remove();
    $.ajax({
        type: 'delete',
        url: 'http://localhost:8080/Country/' + click,
        success: function(data) {
            console.log('inside delete country');
            $.each(data, function(i, item) {
                item.remove();
            });

            alert("Item Successfully Removed");
        },
    });
}

function deletePlayer() {
    // console.log('hi');
    var click = $(this).closest('tr').children().filter(".selectId").text();
    $(this).closest('tr').remove();
    $.ajax({
        type: 'delete',
        url: 'http://localhost:8080/Players/' + click,
        success: function(data) {
            $.each(data, function(i, item) {
                item.remove();
            });

            alert("Item Successfully Removed");
        },
    });
}

function activateCountry() {
    $('#Cname').attr('disabled', false);
    $('#Cid').attr('disabled', false);
}

function AddCountry() {
    var Country = $('#Cname').val();
    var id = $('#Cid').val();
    var rank = $('#Crank').val();
    var medals = $('#Tmedals').val();

    // console.log(medals);
    var countryDetail = {
        CountryName: Country,
        id: id,
        Rank: rank,
        total: medals
    };
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/Country/',
        data: countryDetail,
        success: function(detail) {
            alert('Country detail successfully updated');
        },
    });
}

function activatePlayer() {
    $('#Pid').attr('disabled', false);
    $('#PCname').attr('disabled', false);
}

function AddPlayers() {
    var id = $('#Pid').val();
    var CountryN = $('#PCname').val();
    var Name = $('#Pname').val();
    var medal = $('#Pmedal').val();
    var icolor = $('#PEye').val();
    var sports = $('#Psport').val();
    var event = $('#Pevent').val();
    var date = $('#Pdate').val();
    var pic = $('#Pimage').val();
    var age = $('#Page').val();
    var gender = $('#Pgender').val();
    var phn = $('#Pno').val();
    var about = $('#Pabout').val();
    var PlayerDetail = {
        id: id,
        CountryName: CountryN,
        Name: Name,
        Medal: medal,
        EyeColor: icolor,
        Sports: sports,
        Event: event,
        Date: date,
        Picture: pic,
        Age: age,
        Gender: gender,
        phone: phn,
        About: about
    };
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/Players',
        data: PlayerDetail,
        success: function(detail) {
            alert("Detail successfully updated");
        },
    });
}

function UpdateCountry() {
    var Cname = $('#Cname').val();
    var Id = $('#Cid').val();
    var rank = $('#Crank').val();
    var total = $('#Tmedals').val();
    var cDetail = {
        CountryName: Cname,
        id: Id,
        Rank: rank,
        Total: total
    };
    $.ajax({
        type: 'patch',
        url: 'http://localhost:8080/Country/' + Id,
        data: cDetail,
        success: function(data) {

            alert('data successfully Updated');
        },
    });

}

function UpdatePlayers() {
    var id = $('#Pid').val();
    var CountryN = $('#PCname').val();
    var Name = $('#Pname').val();
    var medal = $('#Pmedal').val();
    var icolor = $('#PEye').val();
    var sports = $('#Psport').val();
    var event = $('#Pevent').val();
    var date = $('#Pdate').val();
    var pic = $('#Pimage').val();
    var age = $('#Page').val();
    var gender = $('#Pgender').val();
    var phn = $('#Pno').val();
    var about = $('#Pabout').val();
    var PlayerDetail = {
        id: id,
        CountryName: CountryN,
        Name: Name,
        Medal: medal,
        EyeColor: icolor,
        Sports: sports,
        Event: event,
        Date: date,
        Picture: pic,
        Age: age,
        Gender: gender,
        phone: phn,
        About: about
    };
    $.ajax({
        type: 'patch',
        url: 'http://localhost:8080/Players/' + id,
        data: PlayerDetail,
        success: function(data) {

            alert('data successfully Updated');
        },
    });
}
});
