$(document).ready(function (){


});

function searchRepositories(){
  let searchTerms = window.$('#searchTerms').val()

  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
    $('#results').html(`<ul> ${response.items.map(item =>
      `<li><a href="${item.owner.html_url}">${item.owner.login}</a>
      <img src="${item.owner.avatar_url}"><br>
      Repository: ${item.name} <br>
      Description: ${item.description}<br>
      <a href="#" data-owner="${item.owner.login}" data-repository="${item.name}" data-commits="${item.commits_url}" onclick="showCommits(this)">Show Commits</a>
      </li>`
    ).join('')}</ul>`)
    console.log(response);
  }).fail(displayError)

}

function showCommits(el){
  console.log(el);
  const url = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`
  $.get(`${url}`, function(response){
    console.log(response);
    $('#details').html(`<ul> ${response.map(commit =>
      `<li><strong><a href="${commit.html_url}">${commit.commit.message}</a><br>
      ${commit.commit.author.name}: ${commit.author.login}</strong>
      <img src="${commit.author.avatar_url}"><br>
      SHA: ${commit.sha} <br>
      </li>`
    ).join('')}</ul>`)
  }).fail(displayError)
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}
