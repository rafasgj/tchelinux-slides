$('.accordion').each(function(index, accordion) {
    var id = $(accordion).attr("id")
    $.ajax({
        cached: true,
        async: true,
        type: "GET",
        url: $(accordion).attr("data-accordion"),
        success: function (data, st, conn) { fillData($(accordion), data) },
        error: function (xhr, st) { alert ("Failed to load data.") }
    })
})

function create_body(content, acordion) {
    list = $("<ul>")
    content.forEach(function (palestra) {
        item = $("<li>", {class: "item-list", style: "position: relative"})
        list.append(item)
        if (palestra.file) {
            item.append($("<i>",{class:"fas fa-desktop link-icon"}))
        }
        else if (palestra.url) {
            item.append($("<i>",{
                    class: "fas fa-external-link-square-alt link-icon",
                }))
        }
        anchor = $('<a>', {text: palestra.title + " "})

        if (palestra.url) {
            anchor.attr("href", palestra.url)
            anchor.attr("target", "_blank")
        }

        if (palestra.file) {
            fn = "activate(this,'" + acordion + "','"+palestra.file+"')"
            anchor.attr('onclick', fn)
            anchor.attr('href', '#slides')
        }

        if (palestra.subtitle) {
            anchor.append($('<small>',{class:"subtitle", text:palestra.subtitle}))
        }
        if (palestra.author) {
            anchor.append($('<small>',{class:"author", text:palestra.author}))
        }
        item.append(anchor)
    })
    return list
}

function get_date(date) {
    month = {
         1: "Janeiro",
         2: "Fevereiro",
         3: "Março",
         4: "Abril",
         5: "Maio",
         6: "Junho",
         7: "Julho",
         8: "Agosto",
         9: "Setembro",
        10: "Outubro",
        11: "Novembro",
        12: "Dezembro",
    }
    components = date.split("-")
    return month[parseInt(components[1])] + " de " + components[0]
}

function create_card(evento, accordion_id) {
    card = $('<div>', {class:"card evento"})
    var card_id = evento.cname + evento.date
    card_info = $('<div>', {class:"card-header", id: card_id })
    card_button = $('<button>', {
            class: "btn btn-link accordion-selector",
            type: "button",
            "data-toggle": "collapse",
            "data-target": "#collapse" + card_id,
            "aria-expanded": "true",
            "aria-controls": "collapse" + card_id
        })
    event_city = $('<b>', { class:"city", text: evento.city })
    event_date = $('<small>', { class:"date", text: get_date(evento.date) })
    card_button.append(event_city).append(event_date)
    card_info.append(card_button)
    card.append(card_info)
    card_collapsable = $('<div>', {
            id: "collapse" + card_id,
            class: "collapse",
            "aria-labelledby": card_id,
            "data-parent": "#" + accordion_id,
        })
    body = $('<div>', { class: 'card-body' })
        .append(create_body(evento.content, accordion_id))
    card.append(card_collapsable.append(body))
    return card
}

function fillData(accordion, data) {
    var scr = $("<span>",{class:"far fa-image",
                          "aria-hidden":"true",
                          style:"font-size:15px;vertical-align:center"})
    var lnk = $("<span>",{class:"fas fa-external-link-alt",
                          "aria-hidden":"true",
                          style:"font-size:10px;vertical-align:top"})

    if (data.config.slideshow) {
        createViewer(accordion.attr('data-viewer'))
    }

    cells = $('<div>', {class: "accordion-cells"})
    accordion.append(cells)
    data.data.forEach(function (evento) {
        cells.append(create_card(evento, accordion.attr('id')))
    })

    first_card = $(accordion.find('.collapse')[0])
    first_card.addClass("show")
    $(first_card.find('li > a')[0]).click()
}

function createViewer(slideviewer) {
    $('#' + slideviewer).append(`
    <div id="slides">
        <canvas id="the-canvas"></canvas>
        <div id="slide-navigation">
            <button class="btn btn-default" id="prev">
                <span class="fa fa-chevron-left" aria-hidden="true"></span>
            </button>
            <span>Page: <span id="page_num"></span> /
                        <span id="page_count"></span>
            </span>
            <button class="btn btn-default" id="next">
                <span class="fa fa-chevron-right" aria-hidden="true"></span>
            </button>
            <a role="button" class="btn btn-default btn-lg" id="download" href=""
               style="float:right;margin-right:1em" download>
                <span class="fa fa-cloud-download-alt" aria-hidden="true"></span>
            </a>
        </div>
    </div>
  `)
}

var activate = function(el, accordion, url) {
    $("#" + accordion +' .active').removeClass('active');
    $(el).parent().addClass('active');
    loadPresentation(url);
}
