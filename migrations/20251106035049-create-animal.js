"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Animais", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      species: {
        type: Sequelize.STRING,
      },
      breed: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING,
      },
      behavior: {
        type: Sequelize.STRING,
      },
      healthIssues: {
        type: Sequelize.STRING,
      },
      photoUrl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Animals");
  },
};
