$( document ).on('turbolinks:load', function() {
   $(".eventBrief").on("click", function(e) {
     e.preventDefault();
     url = this.href
     $.ajax({
       method: "GET",
       url: url,
       dataType: "json",
       success: function (response) {
         let expenses = response["expenses"].map(expense =>
           "<tr> <td>"
           + expense["name"] +
           "</td> <td>"
           + expense["cost"] +
           "</td><td>"
           + expense["quantity"] +
           "</td>  <tr>"
         )
         let guests = "<h3>Guest List</h3><p><ul>" + response["guests"].map(guest =>"<li>"+guest["name"]+"</li>").join('') + "</ul></p>"

          $event =$("#briefedEvent"+response['id'])
          $guest =$("#briefedGuest"+response['id'])

          $event.empty()
          $guest.empty()

          $guest.append(guests)
          $guest.attr('class','data_block')
          $event.append( "<table><tr><th>Name</th><th>Cost</th><th>Quantity</th></tr>"+ expenses.join('') +"</table>")
          $event.attr('class','data_block')


       }
     })
   })

   $("#shopping_list").on('click',function(e){
          e.preventDefault();
          fetch(this.href)
          .then(response => response.json())
          .then(json =>
            $("#list").append(formatShoppingList(json.expenses))
            );

   })

   function turnToDollar(amount){
     return(
      '$'+parseInt(amount).toFixed(2)
     )
   }

   function formatShoppingList(json){
     let list = json.map(expense =>
              `<tr>
                 <td>${expense.name}</td>
                 <td>${turnToDollar(expense.cost)}</td>
                 <td>${expense.quantity}</td>
               </tr>`).join('')
     return(
       `<table>
             <tr>
               <th>Name</th>
               <th>Price</th>
               <th>Quantity</th>
               ${list}
             </tr>
          </table>`
        )
   }

  });
