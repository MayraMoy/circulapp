const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ msg: '🚀 Circulapp Backend está funcionando' });
});

module.exports = app;