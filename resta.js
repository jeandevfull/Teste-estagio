function calculateBill() {
    var customersInput = document.getElementById('customers').value;
    var productsInput = document.getElementById('products').value;
  
    var customers = customersInput.split(',').map(function (customer) {
      return customer.trim();
    });
  
    var products = productsInput.split(',').map(function (product) {
      var parts = product.trim().split('(');
      var name = parts[0];
      var value = parseFloat(parts[1]?.trim()?.replace('R$', '')?.replace(',', '.'));
      return { name: name, value: value };
    });
  
    var bill = {};
  
    customers.forEach(function (customer) {
      bill[customer] = 0;
    });
  
    products.forEach(function (product) {
      var quantity = customers.length;
      var valuePerCustomer = product.value / quantity;
  
      customers.forEach(function (customer) {
        if (customerConsumedProduct(customer, product.name)) {
          bill[customer] += valuePerCustomer;
        }
      });
    });
  
    customers.forEach(function (customer) {
      var serviceCharge = bill[customer] * 0.1;
      bill[customer] += serviceCharge; // Adiciona a taxa de serviço
    });
  
    displayResult(bill);
  }
  
  function customerConsumedProduct(customer, productName) {
    var productsInput = document.getElementById('products').value;
    var products = productsInput.split(',').map(function (product) {
      var parts = product.trim().split('(');
      var name = parts[0];
      return name;
    });
  
    return products.includes(productName) && customer !== '';
  }
  
  function displayResult(bill) {
    var resultSection = document.getElementById('result-section');
    var result = document.getElementById('result');
    result.innerHTML = '';
  
    for (var customer in bill) {
      if (bill.hasOwnProperty(customer)) {
        var amount = bill[customer].toFixed(2);
        result.innerHTML += customer + ': R$ ' + amount + '<br>';
      }
    }
  
    resultSection.style.display = 'block'; // Exibindo a seção de resultados
  
    window.scrollTo(0, resultSection.offsetTop);
  }
  