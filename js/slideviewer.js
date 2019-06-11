
PDFJS.workerSrc = '/js/pdf.worker.js'

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scalePx = 600,
    canvas = null,
    ctx = null

function renderPage(num) {
    pageRendering = true

    pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport(1)
        var scale = scalePx / viewport.width
        viewport = page.getViewport(scale)
        canvas.height = viewport.height
        canvas.width = viewport.width

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        var renderTask = page.render(renderContext)

        // Wait for rendering to finish
        renderTask.promise.then(function() {
          pageRendering = false
          if (pageNumPending !== null) {
            // New page rendering is pending
            renderPage(pageNumPending)
            pageNumPending = null
          }
        })
    })

    document.getElementById('page_num').textContent = pageNum
}

function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}

function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}

function loadPresentation(url) {
    var doc = url
    //const baseHref = (document.getElementsByTagName('base')[0] || '').href;
    //const baseHref = "https://rafasgj.github.io/static-site/"
    const baseHref = ""
    document.getElementById('prev').addEventListener('click', onPrevPage);
    document.getElementById('next').addEventListener('click', onNextPage);
    document.getElementById('download').setAttribute('href',doc);
    canvas = document.getElementById('the-canvas')
    ctx = canvas.getContext('2d')

    pageNum = 1

    PDFJS.getDocument(baseHref + doc).then(function(pdfDoc_) {
      pdfDoc = pdfDoc_
      document.getElementById('page_count').textContent = pdfDoc.numPages

      // Initial/first page rendering
      renderPage(pageNum)
    });
}
