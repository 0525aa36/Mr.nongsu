package com.agri.market.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found for this id :: " + id));

        product.setName(productDetails.getName());
        product.setCategory(productDetails.getCategory());
        product.setOrigin(productDetails.getOrigin());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStock(productDetails.getStock());
        product.setImageUrl(productDetails.getImageUrl());

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found for this id :: " + id));
        productRepository.delete(product);
    }

    // 검색 기능
    public Page<Product> searchProducts(String keyword, String category, String origin, Pageable pageable) {
        return productRepository.searchProducts(keyword, category, origin, pageable);
    }

    // 카테고리로 검색
    public Page<Product> getProductsByCategory(String category, Pageable pageable) {
        return productRepository.findByCategory(category, pageable);
    }

    // 상품명으로 검색
    public Page<Product> searchProductsByName(String name, Pageable pageable) {
        return productRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    // 원산지로 검색
    public Page<Product> searchProductsByOrigin(String origin, Pageable pageable) {
        return productRepository.findByOriginContainingIgnoreCase(origin, pageable);
    }
}