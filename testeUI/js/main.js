$(document).ready(function () {
    $.ajaxSetup({
        crossDomain: true
    });
    $("#game-form").validate({
        rules: {
            nome: {
                required: true
            },
            descricao: {
                required: true
            },
            produtora: {
                required: true
            },
            ano: {
                required: true,
                digits: true 
            },
            idadeMinima: {
                required: true,
                digits: true 
            }
        },
        messages: {
            nome: {
                required: "Por favor, insira o nome do jogo."
            },
            descricao: {
                required: "Por favor, insira a descrição do jogo."
            },
            produtora: {
                required: "Por favor, insira a produtora do jogo."
            },
            ano: {
                required: "Por favor, insira o ano do jogo.",
                digits: "O ano deve ser um número."
            },
            idadeMinima: {
                required: "Por favor, insira a idade mínima.",
                digits: "A idade mínima deve ser um número."
            }
        },
        submitHandler: function (form) {
            const gameData = {
                nome: $("#nome").val(),
                descricao: $("#descricao").val(),
                produtora: $("#produtora").val(),
                ano: parseInt($("#ano").val(), 10),
                idadeMinima: parseInt($("#idadeMinima").val(), 10)
            };
            const id = $("#game-id").val();
            if (id) {
                $.ajax({
                    url: `http://localhost:5000/api/jogos/${id}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(gameData),
                    success: function () {
                        alert("Jogo atualizado com sucesso!");
                        window.location.href = "index.html";
                    }
                });
            } else {
                $.post("http://localhost:5000/api/jogos", gameData, function () {
                    alert("Jogo criado com sucesso!");
                    window.location.href = "index.html";
                });
            }
        }
    });

    function loadGames() {
        $.get("http://localhost:5000/api/jogos", function (data) {
            let gamesList = $("#games-list");
            gamesList.empty();
            data.forEach(game => {
                gamesList.append(`
                  <tr>
                      <td>${game.id}</td>
                      <td>${game.nome}</td>
                      <td>
                          <a href="edit.html?id=${game.id}" class="btn btn-warning btn-sm">Editar</a>
                          <button class="btn btn-danger btn-sm" onclick="deleteGame(${game.id})">Excluir</button>
                      </td>
                  </tr>
              `);
            });
        });
    }

    function loadGame(id) {
        $.get(`http://localhost:5000/api/jogos/${id}`, function (game) {
            $("#game-id").val(game.id);
            $("#nome").val(game.nome);
            $("#descricao").val(game.descricao);
            $("#produtora").val(game.produtora);
            $("#ano").val(game.ano);
            $("#idadeMinima").val(game.idadeMinima);
        });
    }

    window.deleteGame = function (id) {
        if (confirm("Tem certeza que deseja excluir este jogo?")) {
            $.ajax({
                url: `http://localhost:5000/api/jogos/${id}`,
                type: 'DELETE',
                success: function () {
                    alert("Jogo excluído com sucesso!");
                    loadGames();
                }
            });
        }
    };

    loadGames();

    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    if (gameId) {
        loadGame(gameId);
    }
});
