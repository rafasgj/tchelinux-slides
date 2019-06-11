$('.accordion').each(function(index, accordion) {
    var id = $(accordion).attr("id")
    var accordion_id = "accordion_"+$(accordion).attr("id")
    $.ajax({
        cached: true,
        async: true,
        type: "GET",
        url: $(accordion).attr("data-accordion"),
        success: function (data, st, conn) { fillData(id, accordion_id, data) },
        error: function (xhr, st) { alert ("Failed to load data.") }
    })
})

function fillData(accordion, accordion_id, data) {

    var scr = $("<span>",{class:"far fa-image",
                          "aria-hidden":"true",
                          style:"font-size:15px;vertical-align:center"});
    var lnk = $("<span>",{class:"fas fa-external-link-alt",
                          "aria-hidden":"true",
                          style:"font-size:10px;vertical-align:top"});

    $('#' + accordion).append($("<div>",{
                    class:"panel-group", id:accordion_id,
                    role:"tablist", "aria-multiselectable":"false"
                })
            )

    if (data.config.slideshow)
        createViewer($('#' + accordion).attr('data-viewer'))

    var first_one = null
    var active = false
    var expanded = "true"
    data.data.forEach(function (evento) {
        d = new Date(evento.id + " 00:00:00")
        if (isNaN(d.getTime()))
            d = null
        else
            d = d.toLocaleString("pt-BR",{month:"long",year:"numeric"})

        var panel = $('<div>', {class:"panel panel-default"})
        var div = $('<div>', {class:"panel-heading", role:"tab", id:evento.id})
        var link = $('<a>', {
                role:"button", "data-toggle":"collapse",
                "data-parent":"#"+accordion, href:"#data_"+evento.id,
                "aria-expanded":expanded, "aria-controls":evento.id,
                style:"text-decoration:none;color:#222;",
            })
        expanded = "false";
        link.append($("<b>",{class:"list-group-item-heading", text:evento.event}))
        if (d != null)
            link.append($("<small>",{class:"list-group-item-text", style:"float:right", text:d}))
        div.append(link)
        panel.append(div)
        div = $('<div>', {
                role:"tabpanel", id:"data_"+evento.id,
                class:"accordion_data panel-collapse collapse centered",
                "aria-labelledby": evento.id
            })
        evento.content.forEach(function(lecture) {
            if (lecture.file) {
                if (first_one==null) first_one = lecture.file
                link = $('<a>', {
                        href:"#slides",
                        class:"list-group-item palestra",
                        onclick:"activate(this,'"+ accordion +"', '"+lecture.file+"')",
                        text:lecture.title+" "
                    }).append(scr.clone())
            } else if (lecture.url) {
                link = $('<a>', {
                        href:lecture.url,
                        class:"list-group-item palestra",
                        text:lecture.title+" ",
                        target:"_blank"
                    }).append(lnk.clone())
            } else {
                link = $('<a>', {
                        class:"list-group-item palestra",
                        text:lecture.title
                    })
            }
            if (lecture.subtitle) {
                link.append($('<small>',{class:"subtitle",text:lecture.subtitle}))
            }
            if (lecture.author) {
                link.append($('<small>',{class:"author",text:lecture.author}))
            }
            if (!active) {
                div.addClass("in")
                link.addClass("active")
                active = true
            }
            div.append(link)
        })
        panel.append(div)
        $("#"+accordion_id).append(panel)
    })
    if (first_one != null)
        loadPresentation(first_one);
}

function createViewer(slideviewer) {
    $('#'+slideviewer).html(`
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
    el.classList.add('active');
    loadPresentation(url);
}
