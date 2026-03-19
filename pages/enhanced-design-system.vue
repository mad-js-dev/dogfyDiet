<template>
  <div class="enhanced-design-system">
    <!-- Header Section - Full screen first page -->
    <section class="section header-section" data-panel="header">
      <header class="sticky-header">
        <div class="container mx-auto px-4">
          <div class="text-center">
            <h1 class="page-title">Enhanced Design System</h1>
            <p class="page-subtitle">
              Advanced scrolling animations with GSAP and modern design patterns.
            </p>
          </div>
        </div>
      </header>
    </section>

    <!-- Color Section -->
    <section class="section color-section" data-panel="colors">
      <div class="container mx-auto px-4">
        <h2 class="section-title">Color Palette</h2>
        <div class="color-grid">
          <div class="color-card primary">
            <div class="color-swatch" style="background-color: #00B67A;"></div>
            <h3>Primary Green</h3>
            <p>#00B67A</p>
          </div>
          <div class="color-card accent">
            <div class="color-swatch" style="background-color: #EF6948;"></div>
            <h3>Accent Orange</h3>
            <p>#EF6948</p>
          </div>
          <div class="color-card neutral">
            <div class="color-swatch" style="background-color: #3d3d3d;"></div>
            <h3>Neutral Dark</h3>
            <p>#3d3d3d</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Typography Section -->
    <section class="section typography-section" data-panel="typography">
      <div class="container mx-auto px-4">
        <h2 class="section-title">Typography</h2>
        <div class="type-scale">
          <div class="type-item">
            <h1 class="display-1">Display 1</h1>
            <p>Large headlines and hero text</p>
          </div>
          <div class="type-item">
            <h2 class="display-2">Display 2</h2>
            <p>Section headings</p>
          </div>
          <div class="type-item">
            <h3 class="heading-1">Heading 1</h3>
            <p>Subsection headings</p>
          </div>
          <div class="type-item">
            <p class="body-text">Body text for regular content. This is how paragraphs will appear in the design system.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Components Section -->
    <section class="section components-section" data-panel="components">
      <div class="container mx-auto px-4">
        <h2 class="section-title">Components</h2>
        <div class="component-grid">
          <div class="component-card">
            <button class="btn primary">Primary Button</button>
            <p>Primary action button</p>
          </div>
          <div class="component-card">
            <button class="btn secondary">Secondary Button</button>
            <p>Secondary action button</p>
          </div>
          <div class="component-card">
            <div class="card">
              <h4>Card Component</h4>
              <p>Content cards for information display</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Dots -->
    <nav class="panel-nav">
      <div class="nav-dot" data-panel="header" :class="{ active: activePanel === 'header' }"></div>
      <div class="nav-dot" data-panel="colors" :class="{ active: activePanel === 'colors' }"></div>
      <div class="nav-dot" data-panel="typography" :class="{ active: activePanel === 'typography' }"></div>
      <div class="nav-dot" data-panel="components" :class="{ active: activePanel === 'components' }"></div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Page title and meta
useHead({
  title: 'Enhanced Design System - Dogfy Diet',
  meta: [
    { name: 'description', content: 'Advanced design system with GSAP scrolling animations' }
  ]
})

// Reactive state
const activePanel = ref('header')

// Initialize animations
onMounted(() => {
  nextTick(() => {
    initPanelPinning()
    initNavigation()
  })
})

// Panel pinning animation - Basic GreenSock example
const initPanelPinning = () => {
  const panels = document.querySelectorAll('.section')
  const header = document.querySelector('.sticky-header') as HTMLElement
  
  panels.forEach((panel, index) => {
    const panelElement = panel as HTMLElement
    const nextPanel = panels[index + 1] as HTMLElement
    
    // Skip header section from panel pinning - it's handled separately
    if (panelElement.dataset.panel === 'header') {
      // Create separate ScrollTrigger for header animations only
      ScrollTrigger.create({
        trigger: '.header-section',
        start: 'top top',
        end: 'bottom-8vh top',
        scrub: 1,
        onUpdate: (self) => {
          const title = panelElement.querySelector('.page-title') as HTMLElement
          const subtitle = panelElement.querySelector('.page-subtitle') as HTMLElement
          
          if (title && subtitle && header) {
            // Animate subtitle opacity (fade out as scroll progresses)
            const subtitleOpacity = Math.max(0, 1 - (self.progress * 2))
            subtitle.style.opacity = String(subtitleOpacity)
            
            // Animate title size (reduce as scroll progresses)
            const titleScale = Math.max(0.5, 1 - (self.progress * 0.5))
            const titleFontSize = 4 * titleScale // Start at 4rem, go down to 2rem
            title.style.fontSize = `${titleFontSize}rem`
            
            // Animate header to sticky 8vh height
            const headerHeight = Math.max(8, 100 - (self.progress * 92)) // Start at 100vh, end at 8vh
            header.style.height = `${headerHeight}vh`
            
            // Adjust header padding as it shrinks
            const paddingScale = Math.max(0.2, 1 - (self.progress * 0.8))
            header.style.paddingTop = `${4 * paddingScale}vh`
            header.style.paddingBottom = `${4 * paddingScale}vh`
            
            // Move title up as header shrinks
            const titleTranslateY = -(self.progress * 20) // Move up by 20% of header height
            title.style.transform = `scale(${titleScale}) translateY(${titleTranslateY}%)`
          }
        }
      })
      
      // Create second ScrollTrigger to keep header at 8vh after initial animation
      ScrollTrigger.create({
        trigger: '.header-section',
        start: 'bottom-8vh top',
        end: 'max',
        scrub: 1,
        onEnter: () => {
          // Ensure header is exactly 8vh when sticky phase begins
          if (header) {
            header.style.height = '8vh'
            header.style.paddingTop = '1vh'
            header.style.paddingBottom = '1vh'
            header.style.position = 'fixed'
            header.style.top = '0'
            header.style.left = '0'
            header.style.right = '0'
            header.style.zIndex = '1000'
            header.style.background = 'linear-gradient(135deg, #00B67A, #009658)'
          }
          // Hide the original section background
          const headerSection = document.querySelector('.header-section') as HTMLElement
          if (headerSection) {
            headerSection.style.background = 'transparent'
          }
        },
        onLeaveBack: () => {
          // Restore header to original state when scrolling back up
          if (header) {
            header.style.height = '100vh'
            header.style.paddingTop = '4rem'
            header.style.paddingBottom = '4rem'
            header.style.position = 'fixed'
            header.style.top = '0'
            header.style.left = '0'
            header.style.right = '0'
            header.style.zIndex = '1000'
            header.style.background = ''
          }
          // Restore the original section background
          const headerSection = document.querySelector('.header-section') as HTMLElement
          if (headerSection) {
            headerSection.style.background = ''
          }
        }
      })
      
      return
    }
    
    // Pin other panels normally
    ScrollTrigger.create({
      trigger: panelElement,
      start: 'top top',
      end: nextPanel ? `+=${nextPanel.offsetHeight}` : '+=100%',
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        // Update active panel based on scroll progress
        if (self.progress > 0.5) {
          activePanel.value = panelElement.dataset.panel || ''
        }
      }
    })
  })
}

// Navigation functionality
const initNavigation = () => {
  const navDots = document.querySelectorAll('.nav-dot')
  
  navDots.forEach(dot => {
    const dotElement = dot as HTMLElement
    const targetPanel = dotElement.dataset.panel
    
    dotElement.addEventListener('click', () => {
      const targetSection = document.querySelector(`[data-panel="${targetPanel}"]`) as HTMLElement
      if (targetSection) {
        gsap.to(window, {
          duration: 1,
          scrollTo: targetSection,
          ease: 'power2.inOut'
        })
      }
    })
  })
}
</script>

<style lang="scss" scoped>
// Import design system variables
@use '~/assets/styles/_variables' as *;

// Base styles
.enhanced-design-system {
  background-color: $neutral-white;
  overflow-x: hidden;
}

// Section styles - Each section is a full screen panel
.section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  .container {
    max-width: 1200px;
    width: 100%;
  }
}

// Header section - First panel
.header-section {
  background: linear-gradient(135deg, map.get($brand-colors, 'primary'), color.adjust(map.get($brand-colors, 'primary'), $lightness: -20%));
  color: $neutral-white;
  
  .sticky-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    text-align: left;
    padding: 4rem 2rem;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    .page-title {
      font-size: 4rem;
      font-weight: 700;
      margin-bottom: 1rem;
      line-height: 1.2;
      transition: all 0.3s ease;
      transform-origin: center center;
    }
    
    .page-subtitle {
      font-size: 1.25rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
      transition: opacity 0.3s ease;
    }
  }
}

// Add top padding to sections after header to account for sticky header
.color-section,
.typography-section,
.components-section {
  padding-top: 8vh;
}

// Color section
.color-section {
  background-color: #f8f9fa;
  
  .section-title {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 3rem;
    color: $neutral-dark;
  }
  
  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    
    .color-card {
      background: $neutral-white;
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      
      .color-swatch {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 0 auto 1rem;
      }
      
      h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: $neutral-dark;
      }
      
      p {
        color: $neutral-medium;
        font-family: monospace;
      }
    }
  }
}

// Typography section
.typography-section {
  background-color: $neutral-white;
  
  .section-title {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 3rem;
    color: $neutral-dark;
  }
  
  .type-scale {
    .type-item {
      margin-bottom: 3rem;
      text-align: center;
      
      .display-1 {
        font-size: 4rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: map.get($brand-colors, 'primary');
      }
      
      .display-2 {
        font-size: 3rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: color.adjust(map.get($brand-colors, 'primary'), $lightness: -20%);
      }
      
      .heading-1 {
        font-size: 2rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: $neutral-dark;
      }
      
      .body-text {
        font-size: 1rem;
        line-height: 1.6;
        color: $neutral-medium;
        max-width: 600px;
        margin: 0 auto;
      }
    }
  }
}

// Components section
.components-section {
  background-color: #f8f9fa;
  
  .section-title {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 3rem;
    color: $neutral-dark;
  }
  
  .component-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    
    .component-card {
      background: $neutral-white;
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      
      .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        margin-bottom: 1rem;
        
        &.primary {
          background-color: map.get($brand-colors, 'primary');
          color: $neutral-white;
        }
        
        &.secondary {
          background-color: transparent;
          color: map.get($brand-colors, 'primary');
          border: 2px solid map.get($brand-colors, 'primary');
        }
      }
      
      .card {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.5rem;
        text-align: left;
        
        h4 {
          margin-bottom: 0.5rem;
          color: $neutral-dark;
        }
        
        p {
          color: $neutral-medium;
          font-size: 0.9rem;
        }
      }
    }
  }
}

// Navigation dots
.panel-nav {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  
  .nav-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 1rem 0;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.6);
    }
    
    &.active {
      background-color: $primary-green;
      transform: scale(1.5);
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .header-section .sticky-header {
    padding: 2rem 1rem;
    
    .page-title {
      font-size: 2.5rem;
    }
    
    .page-subtitle {
      font-size: 1rem;
    }
  }
  
  .section-title {
    font-size: 2rem !important;
  }
  
  .panel-nav {
    right: 1rem;
  }
}
</style>
