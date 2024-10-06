import { useState, createContext, useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, MessageCircle, Car, Plane, FileText, ShieldCheck, Menu, X, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Create a context for managing the current language
const LanguageContext = createContext({
language: 'en',
setLanguage: (lang: string) => {}
})

// Translations object
const translations = {
en: {
  nav: ['Home', 'About', 'Services', 'Reviews', 'FAQ', 'Contact'],
  hero: {
    title: 'Save up to 1,500,000 rubles on your next car purchase in Georgia',
    subtitle: 'Experience hassle-free car buying with our guided tours',
    cta: 'Contact Us via WhatsApp'
  },
  about: {
    title: 'About Us',
    subtitle: 'Your Trusted Partner in Georgian Car Purchases',
    description: [
      'At GeorgiaCarTours, we\'ve been helping international clients find their perfect vehicles since 2015. Our team of experts combines local knowledge with global experience to make your car buying journey smooth and rewarding.',
      'We pride ourselves on transparency, reliability, and a commitment to saving you both time and money. With our guidance, you\'ll navigate the Georgian car market with confidence, ensuring you get the best deal possible.'
    ]
  },
  services: {
    title: 'Our Comprehensive Services',
    items: [
      {
        title: "Airport Pickup & Accommodation",
        description: "We'll greet you at the airport and arrange comfortable accommodation for your stay."
      },
      {
        title: "Guided Car Market Tours",
        description: "Explore the best car markets in Georgia with our expert guides who know every corner."
      },
      {
        title: "Document Preparation",
        description: "We handle all necessary paperwork, ensuring a smooth and legal purchase process."
      },
      {
        title: "Quality Inspection",
        description: "Our mechanics thoroughly inspect your chosen vehicle to guarantee its condition."
      },
      {
        title: "Translation Services",
        description: "Overcome language barriers with our professional translation services during negotiations."
      },
      {
        title: "Export Assistance",
        description: "We manage the entire export process, including customs clearance and shipping arrangements."
      }
    ]
  },
  testimonials: {
    title: 'Client Testimonials',
    items: [
      {
        text: "A testimonial from a client who benefited from your product or service. Testimonials can be a highly effective way of establishing credibility and increasing your company's reputation.",
        name: "Client Name"
      },
      {
        text: "A testimonial from a client who benefited from your product or service. Testimonials can be a highly effective way of establishing credibility and increasing your company's reputation.",
        name: "Client Name"
      },
      {
        text: "A testimonial from a client who benefited from your product or service. Testimonials can be a highly effective way of establishing credibility and increasing your company's reputation.",
        name: "Client Name"
      }
    ]
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: "How much can I really save by buying a car in Georgia?",
        answer: "On average, our clients save between 500,000 to 1,500,000 rubles compared to prices in their home countries. The exact amount depends on the car model and current market conditions."
      },
      {
        question: "Is it safe to buy a car in Georgia?",
        answer: "Yes, it's safe when you work with a reputable service like ours. We ensure all transactions are legal, vehicles are thoroughly inspected, and all necessary documents are properly prepared."
      },
      {
        question: "How long does the entire process take?",
        answer: "Typically, the process takes 5-7 days from your arrival in Georgia to having your car ready for export. This includes selection, purchase, document preparation, and export procedures."
      },
      {
        question: "Do I need to speak Georgian or Russian?",
        answer: "No, our team provides full translation services. We'll handle all communication with sellers, officials, and other parties involved in the process."
      },
      {
        question: "What about the quality of cars in Georgia?",
        answer: "Georgia imports cars from various countries, including Japan, Europe, and the USA. We help you find high-quality vehicles and provide professional inspection services to ensure the car's condition."
      }
    ]
  },
  contact: {
    title: 'Contact Us',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    placeholders: {
      name: 'Your Name',
      email: 'your@email.com',
      phone: '+1234567890',
      message: 'How can we help you?'
    },
    submit: 'Send Message'
  },
  footer: {
    description: 'Your trusted partner for car purchases in Georgia since 2015.',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Info',
    address: '123 Car Street, Tbilisi, Georgia',
    phone: 'Phone: +995 123 456 789',
    email: 'Email: info@georgiacartours.com',
    followUs: 'Follow Us',
    rights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service'
  }
},
ru: {
  nav: ['Главная', 'О нас', 'Услуги', 'Отзывы', 'FAQ', 'Контакты'],
  hero: {
    title: 'Сэкономьте до 1 500 000 рублей на покупке автомобиля в Грузии',
    subtitle: 'Испытайте удобство покупки автомобиля с нашими экскурсиями',
    cta: 'Свяжитесь с нами через WhatsApp'
  },
  about: {
    title: 'О нас',
    subtitle: 'Ваш надежный партнер в покупке автомобилей в Грузии',
    description: [
      'В GeorgiaCarTours мы помогаем международным клиентам найти идеальные автомобили с 2015 года. Наша команда экспертов сочетает местные знания с глобальным опытом, чтобы сделать ваше путешествие по покупке автомобиля гладким и выгодным.',
      'Мы гордимся прозрачностью, надежностью и стремлением сэкономить ваше время и деньги. С нашим руководством вы будете уверенно ориентироваться на грузинском автомобильном рынке, гарантируя получение лучшей сделки.'
    ]
  },
  services: {
    title: 'Наши комплексные услуги',
    items: [
      {
        title: "Встреча в аэропорту и размещение",
        description: "Мы встретим вас в аэропорту и организуем комфортное проживание на время вашего пребывания."
      },
      {
        title: "Экскурсии по автомобильным рынкам",
        description: "Исследуйте лучшие автомобильные рынки Грузии с нашими экспертами-гидами, которые знают каждый уголок."
      },
      {
        title: "Подготовка документов",
        description: "Мы занимаемся всей необходимой документацией, обеспечивая гладкий и законный процесс покупки."
      },
      {
        title: "Проверка качества",
        description: "Наши механики тщательно проверяют выбранный вами автомобиль, чтобы гарантировать его состояние."
      },
      {
        title: "Услуги перевода",
        description: "Преодолейте языковые барьеры с нашими профессиональными услугами перевода во время переговоров."
      },
      {
        title: "Помощь в экспорте",
        description: "Мы управляем всем процессом экспорта, включая таможенное оформление и организацию доставки."
      }
    ]
  },
  testimonials: {
    title: 'Отзывы клиентов',
    items: [
      {
        text: "Отзыв клиента, который получил пользу от вашего продукта или услуги. Отзывы могут быть очень эффективным способом установления доверия и повышения репутации вашей компании.",
        name: "Имя клиента"
      },
      {
        text: "Отзыв клиента, который получил пользу от вашего продукта или услуги. Отзывы могут быть очень эффективным способом установления доверия и повышения репутации вашей компании.",
        name: "Имя клиента"
      },
      {
        text: "Отзыв клиента, который получил пользу от вашего продукта или услуги. Отзывы могут быть очень эффективным способом установления доверия и повышения репутации вашей компании.",
        name: "Имя клиента"
      }
    ]
  },
  faq: {
    title: 'Часто задаваемые вопросы',
    items: [
      {
        question: "Сколько я действительно могу сэкономить, покупая автомобиль в Грузии?",
        answer: "В среднем наши клиенты экономят от 500 000 до 1 500 000 рублей по сравнению с ценами в их родных странах. Точная сумма зависит от модели автомобиля и текущих рыночных условий."
      },
      {
        question: "Безопасно ли покупать автомобиль в Грузии?",
        answer: "Да, это безопасно, когда вы работаете с надежным сервисом, как наш. Мы гарантируем, что все сделки законны, автомобили тщательно проверены, и все необходимые документы правильно подготовлены."
      },
      {
        question: "Сколько времени занимает весь процесс?",
        answer: "Обычно процесс занимает 5-7 дней с момента вашего прибытия в Грузию до готовности автомобиля к экспорту. Это включает выбор, покупку, подготовку документов и процедуры экспорта."
      },
      {
        question: "Нужно ли мне говорить на грузинском или русском языках?",
        answer: "Нет, наша команда предоставляет полные услуги перевода. Мы будем заниматься всей коммуникацией с продавцами, официальными лицами и другими участниками процесса."
      },
      {
        question: "Как насчет качества автомобилей в Грузии?",
        answer: "Грузия импортирует автомобили из разных стран, включая Японию, Европу и США. Мы помогаем вам найти высококачественные автомобили и предоставляем профессиональные услуги проверки для обеспечения состояния автомобиля."
      }
    ]
  },
  contact: {
    title: 'Свяжитесь с нами',
    name: 'Имя',
    email: 'Электронная почта',
    phone: 'Телефон',
    message: 'Сообщение',
    placeholders: {
      name: 'Ваше имя',
      email: 'ваш@email.com',
      phone: '+1234567890',
      message: 'Как мы можем вам помочь?'
    },
    submit: 'Отправить сообщение'
  },
  footer: {
    description: 'Ваш надежный партнер по покупке автомобилей в Грузии с 2015 года.',
    quickLinks: 'Быстрые ссылки',
    contactInfo: 'Контактная информация',
    address: 'ул. Автомобильная 123, Тбилиси, Грузия',
    phone: 'Телефон: +995 123 456 789',
    email: 'Email: info@georgiacartours.com',
    followUs: 'Следите за нами',
    rights: 'Все права защищены.',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования'
  }
}
}

export default function FullWebsite() {
const [isMenuOpen, setIsMenuOpen] = useState(false)
const [language, setLanguage] = useState('en')

const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  setIsMenuOpen(false)
}

const toggleLanguage = () => {
  setLanguage(language === 'en' ? 'ru' : 'en')
}

const t = translations[language as keyof typeof translations]

return (
  <LanguageContext.Provider value={{ language, setLanguage }}>
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Image src="/placeholder.svg?height=40&width=40" alt="Logo" width={40} height={40} />
              <span className="ml-2 text-xl font-bold text-blue-600">GeorgiaCarTours</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {t.nav.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => scrollToSection(['home', 'about', 'services', 'reviews', 'faq', 'contact'][index])}
                  className="text-gray-600 hover:text-blue-600"
                >
                  {item}
                </Button>
              ))}
              <Button variant="ghost" onClick={toggleLanguage} className="text-gray-600 hover:text-blue-600">
                <Globe className="h-5 w-5 mr-1" />
                {language === 'en' ? 'RU' : 'EN'}
              </Button>
            </div>
            <div className="md:hidden flex items-center">
              <Button variant="ghost" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {t.nav.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => scrollToSection(['home', 'about', 'services', 'reviews', 'faq', 'contact'][index])}
                  className="block w-full text-left text-gray-600 hover:text-blue-600"
                >
                  {item}
                </Button>
              ))}
              <Button variant="ghost" onClick={toggleLanguage} className="block w-full text-left text-gray-600 hover:text-blue-600">
                <Globe className="h-5 w-5 mr-1 inline" />
                {language === 'en' ? 'RU' : 'EN'}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-blue-50 pt-16">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Happy customers receiving their cars"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {t.hero.subtitle}
          </p>
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg">
            {t.hero.cta}
            <MessageCircle className="ml-2" />
          </Button>
        </div>
        <Button
          variant="ghost"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </Button>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.about.title}</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Our team"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">{t.about.subtitle}</h3>
              {t.about.description.map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-4">{paragraph}</p>
              ))}
              <div className="flex items-center space-x-4">
                <Image src="/placeholder.svg?height=50&width=50" alt="Trust badge" width={50} height={50} />
                <Image src="/placeholder.svg?height=50&width=50" alt="Quality badge" width={50} height={50} />
                <Image src="/placeholder.svg?height=50&width=50" alt="Service badge" width={50} height={50} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Services Section */}
      <section id="services" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.services.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  {[Plane, Car, FileText, ShieldCheck, MessageCircle, Car][index] && (
                    <div className="h-12 w-12 text-blue-600 mb-4">
                      {React.createElement([Plane, Car, FileText, ShieldCheck, MessageCircle, Car][index], { className: "h-full w-full" })}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Client Testimonials Section */}
      <section id="reviews" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1e2d5f]">{t.testimonials.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <p className="text-gray-600 mb-6 text-lg">{testimonial.text}</p>
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full mb-4"
                  />
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.faq.title}</h2>
          <Accordion type="single" collapsible className="w-full">
            {t.faq.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Us Form */}
      <section id="contact" className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.contact.title}</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t.contact.name}</label>
                <Input id="name" placeholder={t.contact.placeholders.name} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t.contact.email}</label>
                <Input id="email" type="email" placeholder={t.contact.placeholders.email} />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t.contact.phone}</label>
              <Input id="phone" placeholder={t.contact.placeholders.phone} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t.contact.message}</label>
              <Textarea id="message" placeholder={t.contact.placeholders.message} />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">{t.contact.submit}</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">GeorgiaCarTours</h3>
            <p className="text-sm text-gray-300">{t.footer.description}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {t.nav.map((item, index) => (
                <li key={index}>
                  <Button
                    variant="link"
                    onClick={() => scrollToSection(['home', 'about', 'services', 'reviews', 'faq', 'contact'][index])}
                    className="text-gray-300 hover:text-white p-0"
                  >
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.contactInfo}</h4>
            <p className="text-sm text-gray-300">{t.footer.address}</p>
            <p className="text-sm text-gray-300">{t.footer.phone}</p>
            <p className="text-sm text-gray-300">{t.footer.email}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.followUs}</h4>
            <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <Link key={social} href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} GeorgiaCarTours. {t.footer.rights}</p>
          <div className="mt-2">
            <Link href="#" className="hover:text-white">{t.footer.privacy}</Link>
            <span className="mx-2">|</span>
            <Link href="#" className="hover:text-white">{t.footer.terms}</Link>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <Link
        href="#"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    </div>
  </LanguageContext.Provider>
)
}
