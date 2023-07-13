// Generated by Documenter.jl
requirejs.config({
  paths: {
    'highlight-julia': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/julia.min',
    'headroom': 'https://cdnjs.cloudflare.com/ajax/libs/headroom/0.12.0/headroom.min',
    'jqueryui': 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min',
    'highlight-yaml': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/yaml.min',
    'katex-auto-render': 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.4/contrib/auto-render.min',
    'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min',
    'headroom-jquery': 'https://cdnjs.cloudflare.com/ajax/libs/headroom/0.12.0/jQuery.headroom.min',
    'katex': 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.4/katex.min',
    'highlight': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min',
    'highlight-julia-repl': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/julia-repl.min',
  },
  shim: {
  "highlight-julia": {
    "deps": [
      "highlight"
    ]
  },
  "highlight-yaml": {
    "deps": [
      "highlight"
    ]
  },
  "katex-auto-render": {
    "deps": [
      "katex"
    ]
  },
  "headroom-jquery": {
    "deps": [
      "jquery",
      "headroom"
    ]
  },
  "highlight-julia-repl": {
    "deps": [
      "highlight"
    ]
  }
}
});
////////////////////////////////////////////////////////////////////////////////
require(['jquery', 'katex', 'katex-auto-render'], function($, katex, renderMathInElement) {
$(document).ready(function() {
  renderMathInElement(
    document.body,
    {
  "delimiters": [
    {
      "left": "$",
      "right": "$",
      "display": false
    },
    {
      "left": "$$",
      "right": "$$",
      "display": true
    },
    {
      "left": "\\[",
      "right": "\\]",
      "display": true
    }
  ]
}

  );
})

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery', 'highlight', 'highlight-julia', 'highlight-julia-repl', 'highlight-yaml'], function($) {
$(document).ready(function() {
    hljs.highlightAll();
})

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function($) {

var isExpanded = true;

$(document).on("click", ".docstring header", function () {
  let articleToggleTitle = "Expand docstring";

  if ($(this).siblings("section").is(":visible")) {
    $(this)
      .find(".docstring-article-toggle-button")
      .removeClass("fa-chevron-down")
      .addClass("fa-chevron-right");
  } else {
    $(this)
      .find(".docstring-article-toggle-button")
      .removeClass("fa-chevron-right")
      .addClass("fa-chevron-down");

    articleToggleTitle = "Collapse docstring";
  }

  $(this).find(".docstring-article-toggle-button").prop("title", articleToggleTitle);
  $(this).siblings("section").slideToggle();
});

$(document).on("click", ".docs-article-toggle-button", function () {
  let articleToggleTitle = "Expand docstring";
  let navArticleToggleTitle = "Expand all docstrings";

  if (isExpanded) {
    $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
    $(".docstring-article-toggle-button")
      .removeClass("fa-chevron-down")
      .addClass("fa-chevron-right");

    isExpanded = false;

    $(".docstring section").slideUp();
  } else {
    $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
    $(".docstring-article-toggle-button")
      .removeClass("fa-chevron-right")
      .addClass("fa-chevron-down");

    isExpanded = true;
    articleToggleTitle = "Collapse docstring";
    navArticleToggleTitle = "Collapse all docstrings";

    $(".docstring section").slideDown();
  }

  $(this).prop("title", navArticleToggleTitle);
  $(".docstring-article-toggle-button").prop("title", articleToggleTitle);
});

})
////////////////////////////////////////////////////////////////////////////////
require([], function() {
function addCopyButtonCallbacks() {
  for (const el of document.getElementsByTagName("pre")) {
    const button = document.createElement("button");
    button.classList.add("copy-button", "fa-solid", "fa-copy");
    button.setAttribute("aria-label", "Copy this code block");
    button.setAttribute("title", "Copy");

    el.appendChild(button);

    const success = function () {
      button.classList.add("success", "fa-check");
      button.classList.remove("fa-copy");
    };

    const failure = function () {
      button.classList.add("error", "fa-xmark");
      button.classList.remove("fa-copy");
    };

    button.addEventListener("click", function () {
      copyToClipboard(el.innerText).then(success, failure);

      setTimeout(function () {
        button.classList.add("fa-copy");
        button.classList.remove("success", "fa-check", "fa-xmark");
      }, 5000);
    });
  }
}

function copyToClipboard(text) {
  // clipboard API is only available in secure contexts
  if (window.navigator && window.navigator.clipboard) {
    return window.navigator.clipboard.writeText(text);
  } else {
    return new Promise(function (resolve, reject) {
      try {
        const el = document.createElement("textarea");
        el.textContent = text;
        el.style.position = "fixed";
        el.style.opacity = 0;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");

        resolve();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(el);
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addCopyButtonCallbacks);
} else {
  addCopyButtonCallbacks();
}

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery', 'headroom', 'headroom-jquery'], function($, Headroom) {

// Manages the top navigation bar (hides it when the user starts scrolling down on the
// mobile).
window.Headroom = Headroom; // work around buggy module loading?
$(document).ready(function() {
  $('#documenter .docs-navbar').headroom({
    "tolerance": {"up": 10, "down": 10},
  });
})

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function($) {

// Modal settings dialog
$(document).ready(function() {
  var settings = $('#documenter-settings');
  $('#documenter-settings-button').click(function(){
    settings.toggleClass('is-active');
  });
  // Close the dialog if X is clicked
  $('#documenter-settings button.delete').click(function(){
    settings.removeClass('is-active');
  });
  // Close dialog if ESC is pressed
  $(document).keyup(function(e) {
    if (e.keyCode == 27) settings.removeClass('is-active');
  });
});

})
////////////////////////////////////////////////////////////////////////////////
require([], function() {
let searchbox = document.querySelector("#documenter-search-query");
let sidebar = document.querySelector(".docs-sidebar");

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "/") {
    if (!sidebar.classList.contains("visible")) {
      sidebar.classList.add("visible");
    }
    searchbox.focus();
    return false;
  } else if (event.key === "Escape") {
    if (sidebar.classList.contains("visible")) {
      sidebar.classList.remove("visible");
    }
    searchbox.blur();
    return false;
  }
});

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function($) {

// Manages the showing and hiding of the sidebar.
$(document).ready(function() {
  var sidebar = $("#documenter > .docs-sidebar");
  var sidebar_button = $("#documenter-sidebar-button")
  sidebar_button.click(function(ev) {
    ev.preventDefault();
    sidebar.toggleClass('visible');
    if (sidebar.hasClass('visible')) {
      // Makes sure that the current menu item is visible in the sidebar.
      $("#documenter .docs-menu a.is-active").focus();
    }
  });
  $("#documenter > .docs-main").bind('click', function(ev) {
    if ($(ev.target).is(sidebar_button)) {
      return;
    }
    if (sidebar.hasClass('visible')) {
      sidebar.removeClass('visible');
    }
  });
})

// Resizes the package name / sitename in the sidebar if it is too wide.
// Inspired by: https://github.com/davatron5000/FitText.js
$(document).ready(function() {
  e = $("#documenter .docs-autofit");
  function resize() {
    var L = parseInt(e.css('max-width'), 10);
    var L0 = e.width();
    if(L0 > L) {
      var h0 = parseInt(e.css('font-size'), 10);
      e.css('font-size', L * h0 / L0);
      // TODO: make sure it survives resizes?
    }
  }
  // call once and then register events
  resize();
  $(window).resize(resize);
  $(window).on('orientationchange', resize);
});

// Scroll the navigation bar to the currently selected menu item
$(document).ready(function() {
  var sidebar = $("#documenter .docs-menu").get(0);
  var active = $("#documenter .docs-menu .is-active").get(0);
  if(typeof active !== 'undefined') {
    sidebar.scrollTop = active.offsetTop - sidebar.offsetTop - 15;
  }
})

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function($) {

// Theme picker setup
$(document).ready(function() {
  // onchange callback
  $('#documenter-themepicker').change(function themepick_callback(ev){
    var themename = $('#documenter-themepicker option:selected').attr('value');
    if (themename === 'auto') {
      // set_theme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      window.localStorage.removeItem('documenter-theme');
    } else {
      // set_theme(themename);
      window.localStorage.setItem('documenter-theme', themename);
    }
    // We re-use the global function from themeswap.js to actually do the swapping.
    set_theme_from_local_storage();
  });

  // Make sure that the themepicker displays the correct theme when the theme is retrieved
  // from localStorage
  if(typeof(window.localStorage) !== "undefined") {
    var theme =  window.localStorage.getItem("documenter-theme");
    if(theme !== null) {
      $('#documenter-themepicker option').each(function(i,e) {
        e.selected = (e.value === theme);
      })
    }
  }
})

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function($) {

// update the version selector with info from the siteinfo.js and ../versions.js files
$(document).ready(function() {
  // If the version selector is disabled with DOCUMENTER_VERSION_SELECTOR_DISABLED in the
  // siteinfo.js file, we just return immediately and not display the version selector.
  if (typeof DOCUMENTER_VERSION_SELECTOR_DISABLED === 'boolean' && DOCUMENTER_VERSION_SELECTOR_DISABLED) {
    return;
  }

  var version_selector = $("#documenter .docs-version-selector");
  var version_selector_select = $("#documenter .docs-version-selector select");

  version_selector_select.change(function(x) {
    target_href = version_selector_select.children("option:selected").get(0).value;
    window.location.href = target_href;
  });

  // add the current version to the selector based on siteinfo.js, but only if the selector is empty
  if (typeof DOCUMENTER_CURRENT_VERSION !== 'undefined' && $('#version-selector > option').length == 0) {
    var option = $("<option value='#' selected='selected'>" + DOCUMENTER_CURRENT_VERSION + "</option>");
    version_selector_select.append(option);
  }

  if (typeof DOC_VERSIONS !== 'undefined') {
    var existing_versions = version_selector_select.children("option");
    var existing_versions_texts = existing_versions.map(function(i,x){return x.text});
    DOC_VERSIONS.forEach(function(each) {
      var version_url = documenterBaseURL + "/../" + each + "/";
      var existing_id = $.inArray(each, existing_versions_texts);
      // if not already in the version selector, add it as a new option,
      // otherwise update the old option with the URL and enable it
      if (existing_id == -1) {
        var option = $("<option value='" + version_url + "'>" + each + "</option>");
        version_selector_select.append(option);
      } else {
        var option = existing_versions[existing_id];
        option.value = version_url;
        option.disabled = false;
      }
    });
  }

  // only show the version selector if the selector has been populated
  if (version_selector_select.children("option").length > 0) {
    version_selector.toggleClass("visible");
  }
})

})
