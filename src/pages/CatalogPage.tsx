import { useMemo, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/layout/Hero';
import { Footer } from '../components/layout/Footer';
import { CategoryFilter } from '../components/category/CategoryFilter';
import { ProductGrid } from '../components/product/ProductGrid';
import { CartDrawer } from '../components/cart/CartDrawer';
import { ProductDetailPage } from './ProductDetailPage';
import type { Product } from '../types';
import styles from './CatalogPage.module.css';

export function CatalogPage() {
  const { data: products, loading: productsLoading, error: productsError } = useProducts();
  const { data: categories, loading: categoriesLoading } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (!products) return null;
    if (selectedCategory === null) return products;
    return products.filter(
      (p) => p.category?.id === selectedCategory || p.categoryId === selectedCategory,
    );
  }, [products, selectedCategory]);

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleBack() {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={styles.page}>
      <Navbar
        onCategorySelect={(id) => { setSelectedCategory(id); setSelectedProduct(null); }}
        selectedCategory={selectedCategory}
        categoryCount={categories?.length ?? 0}
        onLogoClick={handleBack}
      />

      <main>
        {selectedProduct ? (
          <ProductDetailPage product={selectedProduct} onBack={handleBack} />
        ) : (
          <>
            <Hero />
            <section id="productos" className={styles.catalog}>
              <div className={styles.catalogHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>Catálogo</h2>
                  {filteredProducts && (
                    <p className={styles.count}>
                      {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                {!categoriesLoading && categories && categories.length > 0 && (
                  <CategoryFilter
                    categories={categories}
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                  />
                )}
              </div>

              <ProductGrid
                products={filteredProducts}
                loading={productsLoading}
                error={productsError}
                onSelectProduct={handleSelectProduct}
              />
            </section>
          </>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
