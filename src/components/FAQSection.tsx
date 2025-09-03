import { useState } from "react"

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  category: string
  questions: FAQItem[]
}

interface FAQSectionProps {
  faqData: FAQCategory[]
}

const FAQSection = ({ faqData }: FAQSectionProps) => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <section className="py-20 bg-background" id="faq">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            FAQs About Booking Your Ride
          </h2>
          <p className="text-muted-foreground text-lg">
            Find quick answers to common questions
          </p>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-10">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-xl font-bold text-orange-500 mb-4">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.questions.map((faq, questionIndex) => {
                  const itemIndex = categoryIndex * 10 + questionIndex
                  const isOpen = openItems.includes(itemIndex)

                  return (
                    <div key={questionIndex} className="border-b border-border">
                      <button
                        onClick={() => toggleItem(itemIndex)}
                        className="w-full flex justify-between items-center py-4 text-left hover:text-orange-500 transition-colors"
                      >
                        <span className="font-medium text-foreground hover:text-orange-500 transition-colors">{faq.question}</span>
                        <span className="text-orange-500 text-2xl font-bold">
                          {isOpen ? "-" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <p className="pb-4 text-muted-foreground">{faq.answer}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection


