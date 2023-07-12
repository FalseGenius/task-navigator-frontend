<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">  

<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasWithBothOptions">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Menu</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div class="dropdown mt-2 mb-5">
      <button class="btn btn-success dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Bill
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item text-success" href="createbill.html">Create</a></li>
      </ul>
    </div>

    <div class="dropdown mb-5">
      <button class="btn btn-success dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Stocks
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="totalstock.html">Total Stock</a></li>
        <li><a class="dropdown-item" href="remstock.html">Remaining Stock</a></li>
        <li><a class="dropdown-item" href="stockforprod.html">Stock For Production</a></li>
      </ul>
    </div>

    <button type="button" class="btn btn-success w-100 mb-5">Product</button>
    <br>

    <button type="button" class="btn btn-success w-100 mb-5">
      <a href="Best_Customer.html" class="text-reset text-decoration-none">Best Customer</a>
    </button>
    <br>

    <button type="button" class="btn btn-success w-100">Total Sales</button>
    <br>
  </div>
</div>
</template>

<script>
export default {
name: "sidebar_comp",
};
</script>