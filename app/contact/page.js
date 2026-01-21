export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-teal-700">
        संपर्क करें
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="space-y-6">
          
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">👤 संपादक</h2>
            <p className="text-lg text-gray-700">कामता प्रसाद (कार्यकारी संपादक)</p>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📧 ईमेल</h2>
            <a href="mailto:hamaramorcha1153@gmail.com" className="text-blue-600 hover:underline text-lg">
              hamaramorcha1153@gmail.com
            </a>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📞 फोन</h2>
            <a href="tel:+919996865069" className="text-blue-600 hover:underline text-lg">
              +91 9996865069
            </a>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">🌐 वेबसाइट</h2>
            <a href="https://hamaramorcha.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-lg">
              hamaramorcha.com
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📍 पता</h2>
            <p className="text-gray-700 leading-relaxed">
              तिवारी भवन, ग्रामः गहरपुर,<br/>
              पोस्टः पुआरीकलाँ-221202,<br/>
              वाराणसी, उत्तर प्रदेश, भारत
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}